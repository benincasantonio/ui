import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "./Card";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Card",
  component: Card,
  subcomponents: {
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardAction,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Custom CSS classes for styling the card",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardContent>
        <p>This is a simple card with just content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a card description that provides additional context.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. This is where the main information is displayed.</p>
      </CardContent>
    </Card>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card with Footer</CardTitle>
        <CardDescription>This card includes a header, content, and footer.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>This card has an action button in the header.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon">⋯</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card content with an action button positioned in the top right of the header.</p>
      </CardContent>
    </Card>
  ),
};

export const WithBorders: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Card with Border Bottom</CardTitle>
          <CardDescription>The header has a border bottom separator.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content area below the bordered header.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card with Border Top Footer</CardTitle>
          <CardDescription>The footer has a border top separator.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content area above the bordered footer.</p>
        </CardContent>
        <CardFooter className="border-t">
          <Button variant="outline">Action</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const Complex: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Complex Card Example</CardTitle>
        <CardDescription>
          This is a comprehensive example showing all card components working together.
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            More
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="font-medium">Feature List</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Responsive design</li>
            <li>Accessible components</li>
            <li>Customizable styling</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="border-t">
        <Button variant="outline" className="mr-2">
          Learn More
        </Button>
        <Button>Get Started</Button>
      </CardFooter>
    </Card>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Custom Styled Card</CardTitle>
        <CardDescription>This card has custom width and styling applied.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>You can apply custom classes to any card component to modify its appearance.</p>
      </CardContent>
    </Card>
  ),
};

