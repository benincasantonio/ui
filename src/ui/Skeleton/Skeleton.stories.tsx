import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the skeleton",
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Skeleton className="w-12 h-12" />,
  play: async ({ canvasElement, step }) => {
    await step("Verify skeleton renders with correct attributes", async () => {
      const skeleton = canvasElement.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass("bg-accent");
      expect(skeleton).toHaveClass("animate-pulse");
      expect(skeleton).toHaveClass("rounded-md");
      expect(skeleton).toHaveAttribute("data-slot", "skeleton");
    });
  },
};

export const TextLine: Story = {
  render: () => (
    <div className="w-[400px]">
      <Skeleton className="w-full h-4" />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify text line skeleton has correct dimensions", async () => {
      const skeleton = canvasElement.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toHaveClass("h-4");
      expect(skeleton).toHaveClass("w-full");
      expect(skeleton).toHaveClass("animate-pulse");
    });
  },
};

export const ParagraphLoading: Story = {
  render: () => (
    <div className="space-y-2 w-[400px]">
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-4/5 h-4" />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify multiple skeleton lines render", async () => {
      const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
      expect(skeletons).toHaveLength(3);

      skeletons.forEach((skeleton) => {
        expect(skeleton).toHaveClass("animate-pulse");
        expect(skeleton).toHaveClass("h-4");
      });
    });
  },
};

export const AvatarSmall: Story = {
  render: () => <Skeleton className="w-8 h-8 rounded-full" />,
  play: async ({ canvasElement, step }) => {
    await step("Verify small avatar skeleton has circular shape", async () => {
      const skeleton = canvasElement.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toHaveClass("rounded-full");
      expect(skeleton).toHaveClass("h-8");
      expect(skeleton).toHaveClass("w-8");
    });
  },
};

export const AvatarMedium: Story = {
  render: () => <Skeleton className="w-12 h-12 rounded-full" />,
};

export const AvatarLarge: Story = {
  render: () => <Skeleton className="w-16 h-16 rounded-full" />,
};

export const ImagePlaceholder: Story = {
  render: () => (
    <div className="w-[400px]">
      <Skeleton className="w-full h-48" />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify image placeholder dimensions", async () => {
      const skeleton = canvasElement.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toHaveClass("h-48");
      expect(skeleton).toHaveClass("w-full");
      expect(skeleton).toHaveClass("animate-pulse");
    });
  },
};

export const LoadingCard: Story = {
  render: () => (
    <div className="p-6 rounded-lg border w-[350px]">
      <div className="flex gap-4 items-center">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-24 h-3" />
        </div>
      </div>
      <div className="mt-6 space-y-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="h-4 w-[70%]" />
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify all card skeleton elements render", async () => {
      const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
      expect(skeletons.length).toBeGreaterThanOrEqual(7);

      skeletons.forEach((skeleton) => {
        expect(skeleton).toHaveClass("animate-pulse");
        expect(skeleton).toHaveAttribute("data-slot", "skeleton");
      });
    });
  },
};

export const LoadingListItem: Story = {
  render: () => (
    <div className="flex gap-4 items-center w-[400px]">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-24 h-3" />
      </div>
      <Skeleton className="w-8 h-8 rounded" />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify list item skeleton layout", async () => {
      const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
      expect(skeletons).toHaveLength(4);

      skeletons.forEach((skeleton) => {
        expect(skeleton).toHaveClass("animate-pulse");
      });
    });
  },
};

export const LoadingGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-[600px]">
      <Skeleton className="w-full h-40 rounded-lg" />
      <Skeleton className="w-full h-40 rounded-lg" />
      <Skeleton className="w-full h-40 rounded-lg" />
      <Skeleton className="w-full h-40 rounded-lg" />
      <Skeleton className="w-full h-40 rounded-lg" />
      <Skeleton className="w-full h-40 rounded-lg" />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify grid has 6 skeleton items", async () => {
      const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
      expect(skeletons).toHaveLength(6);

      skeletons.forEach((skeleton) => {
        expect(skeleton).toHaveClass("animate-pulse");
        expect(skeleton).toHaveClass("h-40");
      });
    });
  },
};

export const CustomClassName: Story = {
  render: () => <Skeleton className="w-48 h-6 rounded-full bg-primary" />,
  play: async ({ canvasElement, step }) => {
    await step("Verify custom classes are applied", async () => {
      const skeleton = canvasElement.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toHaveClass("h-6");
      expect(skeleton).toHaveClass("w-48");
      expect(skeleton).toHaveClass("bg-primary");
      expect(skeleton).toHaveClass("rounded-full");
      expect(skeleton).toHaveClass("animate-pulse");
      expect(skeleton).toHaveAttribute("data-slot", "skeleton");
    });
  },
};

export const ComplexDashboard: Story = {
  render: () => (
    <div className="p-6 rounded-lg border w-[600px]">
      <Skeleton className="mb-6 w-40 h-6" />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <Skeleton className="w-20 h-8" />
          <Skeleton className="w-24 h-3" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-20 h-8" />
          <Skeleton className="w-24 h-3" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-20 h-8" />
          <Skeleton className="w-24 h-3" />
        </div>
      </div>

      <Skeleton className="w-full h-48 rounded-lg" />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify complete dashboard skeleton structure", async () => {
      const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
      expect(skeletons.length).toBeGreaterThanOrEqual(7);

      skeletons.forEach((skeleton) => {
        expect(skeleton).toHaveClass("animate-pulse");
        expect(skeleton).toHaveAttribute("data-slot", "skeleton");
      });
    });

    await step("Verify header skeleton exists", async () => {
      const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
      const headerSkeleton = skeletons[0];
      expect(headerSkeleton).toHaveClass("h-6");
      expect(headerSkeleton).toHaveClass("w-40");
    });
  },
};
