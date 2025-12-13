import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./Label";
import { Input } from "../Input/Input";

const meta = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    htmlFor: {
      control: "text",
      description: "Associates the label with a form control via id",
    },
    className: {
      control: "text",
      description: "Custom CSS classes for styling the label",
    },
    children: {
      control: "text",
      description: "Label text content",
    },
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Label",
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
  ),
};

export const WithInputRequired: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="name">
        Full Name <span className="text-destructive">*</span>
      </Label>
      <Input type="text" id="name" placeholder="Enter your name" required />
    </div>
  ),
};

export const WithInputDisabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="disabled-input" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
        Disabled Input
      </Label>
      <Input type="text" id="disabled-input" placeholder="This input is disabled" disabled />
    </div>
  ),
};

export const MultipleLabels: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid items-center gap-3">
        <Label htmlFor="username">Username</Label>
        <Input type="text" id="username" placeholder="Enter username" />
      </div>
      <div className="grid items-center gap-3">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="Enter password" />
      </div>
      <div className="grid items-center gap-3">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input type="password" id="confirm-password" placeholder="Confirm password" />
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="custom" className="text-lg font-bold text-primary">
        Custom Styled Label
      </Label>
      <Input type="text" id="custom" placeholder="Input with custom label styling" />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-3">
      <div className="grid gap-1.5">
        <Label htmlFor="description-input">Description</Label>
        <p className="text-muted-foreground text-sm">
          This is a description that provides additional context for the input field.
        </p>
      </div>
      <Input type="text" id="description-input" placeholder="Enter description" />
    </div>
  ),
};





