import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { within, userEvent, expect, fn, waitFor } from "storybook/test";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./Form";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Card/Card";

// Basic form schema
const basicFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(20, "Username must be at most 20 characters."),
  email: z.email("Please enter a valid email address."),
});

// Complex form schema
const complexFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

type BasicFormValues = z.infer<typeof basicFormSchema>;
type ComplexFormValues = z.infer<typeof complexFormSchema>;

const meta = {
  title: "Components/Form",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// Basic Form Component
function BasicFormExample() {
  const form = useForm<BasicFormValues>({
    resolver: zodResolver(basicFormSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = fn(() => {
    console.log("Form submitted:");
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Basic Form</CardTitle>
        <CardDescription>Enter your username and email address.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    We'll never share your email with anyone else.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// Complex Form Component
function ComplexFormExample() {
  const form = useForm<ComplexFormValues>({
    resolver: zodResolver(complexFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = fn(() => {
    console.log("Form submitted:");
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Registration Form</CardTitle>
        <CardDescription>Create a new account with password validation.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Must be at least 8 characters with uppercase, lowercase, and number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                Reset
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// Simple Form Component for testing
function SimpleFormExample() {
  const form = useForm<{ name: string }>({
    resolver: zodResolver(z.object({ name: z.string().min(1, "Name is required.") })),
    mode: "onBlur",
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = fn(() => {
    console.log("Form submitted");
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const Basic: Story = {
  render: () => <BasicFormExample />,
};

export const Complex: Story = {
  render: () => <ComplexFormExample />,
};

export const WithValidation: Story = {
  render: () => <SimpleFormExample />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Submit empty form to trigger validation", async () => {
      const submitButton = canvas.getByRole("button", { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(async () => {
        const errorMessage = canvas.getByText("Name is required.");
        expect(errorMessage).toBeInTheDocument();
      });
    });

    await step("Enter valid name and submit", async () => {
      const input = canvas.getByPlaceholderText("Enter your name");
      await userEvent.clear(input);
      await userEvent.type(input, "John Doe", { delay: 50 });

      const submitButton = canvas.getByRole("button", { name: /submit/i });
      await userEvent.click(submitButton);

      // Form should submit successfully (no error message)
      await waitFor(() => {
        const errorMessage = canvas.queryByText("Name is required.");
        expect(errorMessage).not.toBeInTheDocument();
      });
    });
  },
};

export const FormInteraction: Story = {
  render: () => <BasicFormExample />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Fill in username field", async () => {
      const usernameInput = canvas.getByPlaceholderText("shadcn");
      await userEvent.type(usernameInput, "testuser", { delay: 50 });
      expect(usernameInput).toHaveValue("testuser");
    });

    await step("Fill in email field", async () => {
      const emailInput = canvas.getByPlaceholderText("name@example.com");
      await userEvent.type(emailInput, "test@example.com", { delay: 50 });
      expect(emailInput).toHaveValue("test@example.com");
    });

    await step("Submit form with valid data", async () => {
      const submitButton = canvas.getByRole("button", { name: /submit/i });
      await userEvent.click(submitButton);

      // Should not show validation errors - check for specific error messages
      await waitFor(() => {
        const usernameError = canvas.queryByText(/username must be/i);
        const emailError = canvas.queryByText("Please enter a valid email address.");
        expect(usernameError).not.toBeInTheDocument();
        expect(emailError).not.toBeInTheDocument();
      });
    });
  },
};

export const ValidationErrors: Story = {
  render: () => <BasicFormExample />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Submit form with invalid data", async () => {
      const submitButton = canvas.getByRole("button", { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(async () => {
        const usernameError = canvas.getByText("Username must be at least 3 characters.");
        const emailError = canvas.getByText("Please enter a valid email address.");
        expect(usernameError).toBeInTheDocument();
        expect(emailError).toBeInTheDocument();
      });
    });

    await step("Enter invalid username (too short)", async () => {
      const usernameInput = canvas.getByPlaceholderText("shadcn");
      await userEvent.clear(usernameInput);
      await userEvent.type(usernameInput, "ab", { delay: 50 });
      await userEvent.tab(); // Trigger validation

      await waitFor(() => {
        const error = canvas.getByText("Username must be at least 3 characters.");
        expect(error).toBeInTheDocument();
      });
    });

    await step("Enter invalid email", async () => {
      const emailInput = canvas.getByPlaceholderText("name@example.com");
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, "invalid-email", { delay: 50 });
      await userEvent.tab(); // Trigger validation

      await waitFor(() => {
        const error = canvas.getByText("Please enter a valid email address.");
        expect(error).toBeInTheDocument();
      });
    });
  },
};

export const PasswordValidation: Story = {
  render: () => <ComplexFormExample />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Enter weak password", async () => {
      const passwordInput = canvas.getByPlaceholderText("Enter password");
      await userEvent.type(passwordInput, "weak", { delay: 50 });
      await userEvent.tab();

      await waitFor(
        () => {
          const error = canvas.getByText("Password must be at least 8 characters.");
          expect(error).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    await step("Enter password without uppercase", async () => {
      const passwordInput = canvas.getByPlaceholderText("Enter password");
      await userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, "password123", { delay: 50 });
      await userEvent.tab();

      await waitFor(
        () => {
          const error = canvas.getByText("Password must contain at least one uppercase letter.");
          expect(error).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    await step("Enter mismatched passwords", async () => {
      const passwordInput = canvas.getByPlaceholderText("Enter password");
      await userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, "Password123", { delay: 50 });
      
      const confirmInput = canvas.getByPlaceholderText("Confirm password");
      await userEvent.clear(confirmInput);
      await userEvent.type(confirmInput, "Password456", { delay: 50 });
      await userEvent.tab();

      await waitFor(
        () => {
          const error = canvas.getByText("Passwords don't match.");
          expect(error).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
  },
};

export const FormReset: Story = {
  render: () => <ComplexFormExample />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Fill in form fields", async () => {
      await userEvent.type(canvas.getByPlaceholderText("John Doe"), "John Doe", { delay: 50 });
      await userEvent.type(canvas.getByPlaceholderText("john@example.com"), "john@example.com", { delay: 50 });
      await userEvent.type(canvas.getByPlaceholderText("Enter password"), "Password123", { delay: 50 });
      await userEvent.type(canvas.getByPlaceholderText("Confirm password"), "Password123", { delay: 50 });
    });

    await step("Reset form", async () => {
      const resetButton = canvas.getByRole("button", { name: /reset/i });
      await userEvent.click(resetButton);

      await waitFor(() => {
        expect(canvas.getByPlaceholderText("John Doe")).toHaveValue("");
        expect(canvas.getByPlaceholderText("john@example.com")).toHaveValue("");
        expect(canvas.getByPlaceholderText("Enter password")).toHaveValue("");
        expect(canvas.getByPlaceholderText("Confirm password")).toHaveValue("");
      });
    });
  },
};

