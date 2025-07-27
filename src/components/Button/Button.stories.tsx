import {Button} from "./Button.tsx";
import {fn} from "storybook/test";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {Download} from "lucide-react";

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onClick: fn(),
        disabled: {control: 'boolean'},
        variant: {
            control: 'select',
            options: ['default', 'secondary', 'destructive', 'outline', 'ghost'],
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg', 'icon']
        }
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Primary: Story = {
    args: {
        variant: 'default',
        children: 'Button',
    },
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Button',
    },
}

export const Destructive: Story = {
    args: {
        variant: 'destructive',
        children: 'Button',
    },
}

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Button',
    },
}

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        children: 'Button',
    },
}

export const Disabled: Story = {
    args: {
        variant: 'default',
        disabled: true,
        children: 'Button',
    },
}

export const Icon: Story = {
    args: {
        variant: 'default',
        size: 'icon',
        children: <Download className="size-5" />,
    },
}

export const Large: Story = {
    args: {
        variant: 'default',
        size: 'lg',
        children: 'Button',
    },
}

export const Small: Story = {
    args: {
        variant: 'default',
        size: 'sm',
        children: 'Button',
    },
}

