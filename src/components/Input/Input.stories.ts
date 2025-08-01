import type {Meta, StoryObj} from "@storybook/react-vite";
import {Input} from "@/components/Input/Input.tsx";

const meta = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
            description: 'Type of the input field',
            defaultValue: 'text',
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the input field when true'
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text for the input field'
        },
        className: {
            control: 'text',
            description: 'Custom CSS classes for styling the input field'
        },
        autoFocus: {
            control: 'boolean',
            description: 'Automatically focuses the input field on page load'
        },
    },
    args: {
        type: 'text',
        disabled: false,
        placeholder: 'Enter text here...',
        className: '',
        autoFocus: false,
    }
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: 'Disabled input',
    }
}

export const Password: Story = {
    args: {
        type: 'password',
        placeholder: 'Enter password',
    }
}

export const Email: Story = {
    args: {
        type: 'email',
        placeholder: 'Enter email',
    }
}

export const Number: Story = {
    args: {
        type: 'number',
        placeholder: 'Enter number',
    }
}

export const Search: Story = {
    args: {
        type: 'search',
        placeholder: 'Search...',
    }
}

export const AutoFocus: Story = {
    args: {
        autoFocus: true,
        placeholder: 'This input will auto-focus',
    }
}

export const CustomClass: Story = {
    args: {
        className: 'border border-blue-500',
        placeholder: 'Custom styled input',
    }
}

export const DefaultValue: Story = {
    args: {
        defaultValue: 'Homer Simpson',
        placeholder: 'Input with default value',
    }
}