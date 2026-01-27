import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./AlertDialog";
import { Button } from "../Button/Button";
import { AlertTriangle, Trash2, Info, CheckCircle } from "lucide-react";
import { useState } from "react";

const meta = {
    title: "Components/AlertDialog",
    component: AlertDialog,
    subcomponents: {
        AlertDialogTrigger,
        AlertDialogContent,
        AlertDialogHeader,
        AlertDialogFooter,
        AlertDialogTitle,
        AlertDialogDescription,
        AlertDialogMedia,
        AlertDialogAction,
        AlertDialogCancel,
    },
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "A modal dialog that interrupts the user with important content and expects a response. Built on top of Radix UI's Alert Dialog primitive.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default alert dialog with title, description, and action buttons.
 * This is the most common use case for confirming user actions.
 */
export const Default: Story = {
    render: () => (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step("Open alert dialog", async () => {
            const trigger = canvas.getByRole("button", { name: /show dialog/i });
            await userEvent.click(trigger);

            await waitFor(() => {
                expect(document.body).toHaveTextContent("Are you absolutely sure?");
                expect(document.body).toHaveTextContent("This action cannot be undone");
            });
        });

        await step("Close with cancel button", async () => {
            const cancelButton = await waitFor(() =>
                within(document.body).getByRole("button", { name: /cancel/i })
            );
            await userEvent.click(cancelButton);

            await waitFor(() => {
                expect(document.body).not.toHaveTextContent("Are you absolutely sure?");
            });
        });
    },
};

/**
 * A smaller, more compact version of the alert dialog.
 * Useful for simpler confirmations with less content.
 */
export const Small: Story = {
    render: () => (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Small Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm action</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to proceed?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>No</AlertDialogCancel>
                    <AlertDialogAction>Yes</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step("Open small alert dialog", async () => {
            const trigger = canvas.getByRole("button", { name: /small dialog/i });
            await userEvent.click(trigger);

            await waitFor(() => {
                const content = document.querySelector(
                    '[data-slot="alert-dialog-content"]'
                );
                expect(content).toHaveAttribute("data-size", "sm");
            });
        });
    },
};

/**
 * Alert dialog with a media element (icon) in the header.
 * Great for drawing attention to important warnings or information.
 */
export const WithMedia: Story = {
    render: () => (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Dialog with Icon</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogMedia>
                        <AlertTriangle className="text-warning" />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Warning: Unsaved Changes</AlertDialogTitle>
                    <AlertDialogDescription>
                        You have unsaved changes that will be lost if you leave this page.
                        Are you sure you want to continue?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Stay on Page</AlertDialogCancel>
                    <AlertDialogAction>Leave Page</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ),
};

/**
 * Small dialog with a media element.
 * Useful for compact confirmations that need visual emphasis.
 */
export const SmallWithMedia: Story = {
    render: () => (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Small with Icon</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia>
                        <Info className="text-blue-500" />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Quick Tip</AlertDialogTitle>
                    <AlertDialogDescription>
                        You can use keyboard shortcuts to navigate faster.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Dismiss</AlertDialogCancel>
                    <AlertDialogAction>Got it</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ),
};

/**
 * Alert dialog for destructive actions like deletion.
 * Uses the destructive button variant to emphasize the danger.
 */
export const Destructive: Story = {
    render: () => (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogMedia>
                        <Trash2 className="text-destructive" />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete Account</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action is permanent and cannot be undone. All your data,
                        including your profile, posts, and settings will be permanently
                        deleted.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">
                        Delete Account
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step("Open destructive dialog", async () => {
            const trigger = canvas.getByRole("button", { name: /delete account/i });
            await userEvent.click(trigger);

            await waitFor(() => {
                expect(document.body).toHaveTextContent("Delete Account");
                const actionButton = within(document.body).getAllByRole("button", {
                    name: /delete account/i,
                })[1]; // The action button inside the dialog
                expect(actionButton).toHaveAttribute("data-variant", "destructive");
            });
        });
    },
};

/**
 * Alert dialog with custom action button labels.
 * Shows how to customize the button text for specific use cases.
 */
export const CustomActions: Story = {
    render: () => (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Publish Article</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogMedia>
                        <CheckCircle className="text-green-500" />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Ready to Publish?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your article will be visible to all users once published. You can
                        still edit it after publishing.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Save as Draft</AlertDialogCancel>
                    <AlertDialogAction>Publish Now</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ),
};

/**
 * Example of a controlled alert dialog where the open state
 * is managed by the parent component.
 */
export const Controlled: Story = {
    render: function ControlledStory() {
        const [open, setOpen] = useState(false);
        const [confirmed, setConfirmed] = useState(false);

        return (
            <div className="flex flex-col items-center gap-4">
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline">Open Controlled Dialog</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Controlled Dialog</AlertDialogTitle>
                            <AlertDialogDescription>
                                This dialog's state is controlled by React state. The parent
                                component manages when it opens and closes.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    setConfirmed(true);
                                    setOpen(false);
                                }}
                            >
                                Confirm
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                {confirmed && (
                    <p className="text-green-600 text-sm">
                        ✓ Action confirmed successfully!
                    </p>
                )}
            </div>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step("Open and confirm controlled dialog", async () => {
            const trigger = canvas.getByRole("button", {
                name: /open controlled dialog/i,
            });
            await userEvent.click(trigger);

            await waitFor(() => {
                expect(document.body).toHaveTextContent("Controlled Dialog");
            });

            const confirmButton = within(document.body).getByRole("button", {
                name: /confirm/i,
            });
            await userEvent.click(confirmButton);

            await waitFor(() => {
                expect(canvas.getByText(/action confirmed successfully/i)).toBeInTheDocument();
            });
        });
    },
};

/**
 * Example with different button sizes.
 * Shows how to customize button sizes in the footer.
 */
export const CustomButtonSizes: Story = {
    render: () => (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Custom Button Sizes</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Custom Button Sizes</AlertDialogTitle>
                    <AlertDialogDescription>
                        This example demonstrates using different button sizes in the alert
                        dialog footer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel size="sm">Small Cancel</AlertDialogCancel>
                    <AlertDialogAction size="lg">Large Action</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ),
};

/**
 * Simple confirmation dialog without description.
 * Useful for quick yes/no confirmations.
 */
export const TitleOnly: Story = {
    render: () => (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Simple Confirm</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>No</AlertDialogCancel>
                    <AlertDialogAction>Yes</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    ),
};
