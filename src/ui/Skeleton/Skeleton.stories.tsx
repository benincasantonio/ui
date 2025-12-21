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
  render: () => <Skeleton className="h-12 w-12" />,
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
      <Skeleton className="h-4 w-full" />
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
    <div className="w-[400px] space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify multiple skeleton lines render", async () => {
      const skeletons = canvasElement.querySelectorAll(
        '[data-slot="skeleton"]',
      );
      expect(skeletons).toHaveLength(3);

      skeletons.forEach((skeleton) => {
        expect(skeleton).toHaveClass("animate-pulse");
        expect(skeleton).toHaveClass("h-4");
      });
    });
  },
};

export const AvatarSmall: Story = {
  render: () => <Skeleton className="h-8 w-8 rounded-full" />,
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
  render: () => <Skeleton className="h-12 w-12 rounded-full" />,
};

export const AvatarLarge: Story = {
  render: () => <Skeleton className="h-16 w-16 rounded-full" />,
};

export const ImagePlaceholder: Story = {
  render: () => (
    <div className="w-[400px]">
      <Skeleton className="h-48 w-full" />
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
    <div className="w-[350px] rounded-lg border p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="mt-6 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[70%]" />
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify all card skeleton elements render", async () => {
      const skeletons = canvasElement.querySelectorAll(
        '[data-slot="skeleton"]',
      );
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
    <div className="flex w-[400px] items-center gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-8 w-8 rounded" />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify list item skeleton layout", async () => {
      const skeletons = canvasElement.querySelectorAll(
        '[data-slot="skeleton"]',
      );
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
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-40 w-full rounded-lg" />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify grid has 6 skeleton items", async () => {
      const skeletons = canvasElement.querySelectorAll(
        '[data-slot="skeleton"]',
      );
      expect(skeletons).toHaveLength(6);

      skeletons.forEach((skeleton) => {
        expect(skeleton).toHaveClass("animate-pulse");
        expect(skeleton).toHaveClass("h-40");
      });
    });
  },
};

export const CustomClassName: Story = {
  render: () => <Skeleton className="h-6 w-48 bg-primary rounded-full" />,
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
    <div className="w-[600px] rounded-lg border p-6">
      <Skeleton className="h-6 w-40 mb-6" />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify complete dashboard skeleton structure", async () => {
      const skeletons = canvasElement.querySelectorAll(
        '[data-slot="skeleton"]',
      );
      expect(skeletons.length).toBeGreaterThanOrEqual(7);

      skeletons.forEach((skeleton) => {
        expect(skeleton).toHaveClass("animate-pulse");
        expect(skeleton).toHaveAttribute("data-slot", "skeleton");
      });
    });

    await step("Verify header skeleton exists", async () => {
      const skeletons = canvasElement.querySelectorAll(
        '[data-slot="skeleton"]',
      );
      const headerSkeleton = skeletons[0];
      expect(headerSkeleton).toHaveClass("h-6");
      expect(headerSkeleton).toHaveClass("w-40");
    });
  },
};
