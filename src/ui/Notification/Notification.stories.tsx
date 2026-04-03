import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { type NotificationVariant, useNotification } from "../../hooks/useNotification";
import { NotificationProvider } from "./NotificationProvider";

const meta: Meta = {
  title: "Components/Notification",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NotificationProvider>
        <div style={{ padding: "2rem" }}>
          <Story />
        </div>
      </NotificationProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

/* ── Helpers ── */

function TriggerButton({
  variant = "info",
  title,
  message,
  duration,
  label,
}: {
  variant?: NotificationVariant;
  title?: string;
  message?: string;
  duration?: number;
  label?: string;
}) {
  const { notify } = useNotification();
  return (
    <button
      type="button"
      onClick={() =>
        notify({
          variant,
          title,
          message: message ?? `This is a ${variant} notification.`,
          duration,
        })
      }
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "var(--radius-md, 8px)",
        border: "1px solid var(--border)",
        background: "var(--secondary)",
        color: "var(--secondary-foreground)",
        cursor: "pointer",
        fontSize: "0.875rem",
      }}
    >
      {label ?? `Show ${variant}`}
    </button>
  );
}

/* ── Stories ── */

export const Default: Story = {
  render: () => <TriggerButton />,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <TriggerButton variant="success" />
      <TriggerButton variant="info" />
      <TriggerButton variant="warning" />
      <TriggerButton variant="danger" />
    </div>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <TriggerButton
      variant="success"
      title="Operation completed"
      message="Your changes have been saved successfully."
      label="Show with title"
    />
  ),
};

export const CustomDuration: Story = {
  render: () => (
    <TriggerButton
      variant="info"
      message="This disappears in 2 seconds."
      duration={2000}
      label="Show (2s duration)"
    />
  ),
};

export const Persistent: Story = {
  render: () => (
    <TriggerButton
      variant="danger"
      title="Action required"
      message="This notification must be dismissed manually."
      duration={0}
      label="Show persistent"
    />
  ),
};

export const Stacking: Story = {
  render: function StackingStory() {
    const { notify } = useNotification();
    const variants: NotificationVariant[] = ["success", "info", "warning", "danger"];
    const counterRef = React.useRef(0);
    return (
      <button
        type="button"
        onClick={() => {
          const i = counterRef.current;
          const variant = variants[i % variants.length];
          notify({
            variant,
            title: `Notification #${i + 1}`,
            message: `This is a ${variant} notification.`,
          });
          counterRef.current++;
        }}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "var(--radius-md, 8px)",
          border: "1px solid var(--border)",
          background: "var(--secondary)",
          color: "var(--secondary-foreground)",
          cursor: "pointer",
          fontSize: "0.875rem",
        }}
      >
        Add notification
      </button>
    );
  },
};

export const DismissAll: Story = {
  render: function DismissAllStory() {
    const { notify, dismissAll } = useNotification();

    const showAll = () => {
      notify({ variant: "success", message: "First notification.", duration: 30000 });
      notify({ variant: "info", message: "Second notification.", duration: 30000 });
      notify({ variant: "warning", message: "Third notification.", duration: 30000 });
    };

    const buttonStyle = {
      padding: "0.5rem 1rem",
      borderRadius: "var(--radius-md, 8px)",
      border: "1px solid var(--border)",
      background: "var(--secondary)",
      color: "var(--secondary-foreground)",
      cursor: "pointer",
      fontSize: "0.875rem",
    };

    return (
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="button" onClick={showAll} style={buttonStyle}>
          Show 3 notifications
        </button>
        <button type="button" onClick={dismissAll} style={buttonStyle}>
          Dismiss all
        </button>
      </div>
    );
  },
};
