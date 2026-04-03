import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "info", "warning", "danger"],
    },
    dismissible: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: {
    variant: "success",
    message: "Your changes have been saved successfully.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    message: "A new software update is available.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    message: "Your session is about to expire.",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    message: "There was an error processing your request.",
  },
};

export const WithTitle: Story = {
  args: {
    variant: "success",
    title: "Operation completed",
    message: "Your changes have been saved successfully.",
  },
};

export const Dismissible: Story = {
  render: function DismissibleAlert() {
    const [visible, setVisible] = React.useState(true);
    return visible ? (
      <Alert
        variant="warning"
        title="Warning"
        message="This alert can be dismissed by clicking the X button."
        dismissible
        onDismiss={() => setVisible(false)}
      />
    ) : (
      <button
        type="button"
        onClick={() => setVisible(true)}
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
        Show again
      </button>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "24rem" }}>
      <Alert variant="success" title="Success" message="Operation completed successfully." />
      <Alert variant="info" title="Info" message="Here is some useful information." />
      <Alert variant="warning" title="Warning" message="Please review before continuing." />
      <Alert variant="danger" title="Error" message="Something went wrong." />
    </div>
  ),
};
