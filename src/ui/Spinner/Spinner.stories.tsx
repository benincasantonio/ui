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
    <div className="flex gap-2 items-center">
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
      type="button"
      disabled
      className="inline-flex gap-2 items-center py-2 px-4 rounded-md bg-primary text-primary-foreground"
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
    <div className="p-6 rounded-lg border w-[300px]">
      <div className="flex flex-col gap-4 justify-center items-center">
        <Spinner className="size-8" />
        <p className="text-sm text-muted-foreground">Loading your content...</p>
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
    <div className="flex gap-6 items-center">
      <div className="flex flex-col gap-2 items-center">
        <Spinner className="size-3" />
        <span className="text-xs text-muted-foreground">XS</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Spinner className="size-4" />
        <span className="text-xs text-muted-foreground">SM</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Spinner className="size-6" />
        <span className="text-xs text-muted-foreground">MD</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Spinner className="size-8" />
        <span className="text-xs text-muted-foreground">LG</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
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
    <div className="flex gap-6 items-center">
      <div className="flex flex-col gap-2 items-center">
        <Spinner className="text-primary size-6" />
        <span className="text-xs text-muted-foreground">Primary</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Spinner className="text-secondary-foreground size-6" />
        <span className="text-xs text-muted-foreground">Secondary</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Spinner className="text-destructive size-6" />
        <span className="text-xs text-muted-foreground">Destructive</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Spinner className="text-muted-foreground size-6" />
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
    <div className="flex justify-center items-center rounded-lg border bg-background h-[400px] w-[600px]">
      <div className="flex flex-col gap-4 items-center">
        <Spinner className="size-12" />
        <div className="text-center">
          <h3 className="font-semibold">Loading</h3>
          <p className="text-sm text-muted-foreground">Please wait while we fetch your data</p>
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
      expect(canvasElement.textContent).toContain("Please wait while we fetch your data");
    });
  },
};
