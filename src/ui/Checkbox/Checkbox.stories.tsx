import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { Label } from "../Label/Label";
import * as React from "react";

const meta: Meta<typeof Checkbox> = {
    title: "UI/Checkbox",
    component: Checkbox,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        checked: {
            control: "boolean",
            description: "Controlled checked state",
        },
        defaultChecked: {
            control: "boolean",
            description: "Initial checked state for uncontrolled usage",
        },
        disabled: {
            control: "boolean",
            description: "Whether the checkbox is disabled",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {},
};

export const Checked: Story = {
    args: {
        defaultChecked: true,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        disabled: true,
        defaultChecked: true,
    },
};

export const WithLabel: Story = {
    render: (args) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Checkbox id="terms" {...args} />
            <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
    ),
};

export const Controlled: Story = {
    render: function ControlledCheckbox() {
        const [checked, setChecked] = React.useState(false);
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Checkbox
                        id="controlled"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                    />
                    <Label htmlFor="controlled">Controlled checkbox</Label>
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                    Checked: {checked ? "true" : "false"}
                </p>
            </div>
        );
    },
};
