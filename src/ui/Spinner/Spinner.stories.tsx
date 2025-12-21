import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Spinner } from "./Spinner";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the spinner",
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Spinner />,
  play: async ({ canvasElement, step }) => {
    await step("Verify spinner renders with correct attributes", async () => {
      const spinner = canvasElement.querySelector('[role="status"]');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute("role", "status");
      expect(spinner).toHaveAttribute("aria-label", "Loading");
      expect(spinner).toHaveClass("animate-spin");
      expect(spinner).toHaveClass("size-4");
    });
  },
};

export const Small: Story = {
  render: () => <Spinner className="size-3" />,
  play: async ({ canvasElement, step }) => {
    await step("Verify small spinner has correct size", async () => {
      const spinner = canvasElement.querySelector('[role="status"]');
      expect(spinner).toHaveClass("size-3");
      expect(spinner).toHaveClass("animate-spin");
    });
  },
};

export const Medium: Story = {
  render: () => <Spinner className="size-6" />,
};

export const Large: Story = {
  render: () => <Spinner className="size-8" />,
};

export const ExtraLarge: Story = {
  render: () => <Spinner className="size-12" />,
};

export const WithCustomColor: Story = {
  render: () => <Spinner className="text-primary" />,
  play: async ({ canvasElement, step }) => {
    await step("Verify custom color class is applied", async () => {
      const spinner = canvasElement.querySelector('[role="status"]');
      expect(spinner).toHaveClass("text-primary");
      expect(spinner).toHaveClass("animate-spin");
    });
  },
};

export const WithText: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner />
      <span>Loading...</span>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify spinner and text render together", async () => {
      const spinner = canvasElement.querySelector('[role="status"]');
      expect(spinner).toBeInTheDocument();
      expect(canvasElement.textContent).toContain("Loading...");
    });
  },
};

export const InButton: Story = {
  render: () => (
    <button
      disabled
      className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground"
    >
      <Spinner className="size-4" />
      <span>Processing...</span>
    </button>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify spinner in button context", async () => {
      const button = canvasElement.querySelector("button");
      expect(button).toBeDisabled();

      const spinner = canvasElement.querySelector('[role="status"]');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass("animate-spin");
    });
  },
};

export const InCard: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border p-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <Spinner className="size-8" />
        <p className="text-sm text-muted-foreground">
          Loading your content...
        </p>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify spinner in card context", async () => {
      const spinner = canvasElement.querySelector('[role="status"]');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass("size-8");
      expect(canvasElement.textContent).toContain("Loading your content...");
    });
  },
};

export const MultipleSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-3" />
        <span className="text-xs text-muted-foreground">XS</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-4" />
        <span className="text-xs text-muted-foreground">SM</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-6" />
        <span className="text-xs text-muted-foreground">MD</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-8" />
        <span className="text-xs text-muted-foreground">LG</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-12" />
        <span className="text-xs text-muted-foreground">XL</span>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify all spinner sizes render", async () => {
      const spinners = canvasElement.querySelectorAll('[role="status"]');
      expect(spinners).toHaveLength(5);

      spinners.forEach((spinner) => {
        expect(spinner).toHaveClass("animate-spin");
        expect(spinner).toHaveAttribute("role", "status");
      });
    });
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-6 text-primary" />
        <span className="text-xs text-muted-foreground">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-6 text-secondary-foreground" />
        <span className="text-xs text-muted-foreground">Secondary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-6 text-destructive" />
        <span className="text-xs text-muted-foreground">Destructive</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-6 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Muted</span>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify all color variants render", async () => {
      const spinners = canvasElement.querySelectorAll('[role="status"]');
      expect(spinners).toHaveLength(4);

      spinners.forEach((spinner) => {
        expect(spinner).toHaveClass("animate-spin");
        expect(spinner).toHaveClass("size-6");
      });
    });
  },
};

export const FullPageLoader: Story = {
  render: () => (
    <div className="flex h-[400px] w-[600px] items-center justify-center rounded-lg border bg-background">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="size-12" />
        <div className="text-center">
          <h3 className="font-semibold">Loading</h3>
          <p className="text-sm text-muted-foreground">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify full page loader structure", async () => {
      const spinner = canvasElement.querySelector('[role="status"]');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass("size-12");
      expect(canvasElement.textContent).toContain("Loading");
      expect(canvasElement.textContent).toContain(
        "Please wait while we fetch your data",
      );
    });
  },
};
