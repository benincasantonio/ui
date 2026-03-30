import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, userEvent, within } from "storybook/test";
import { Textarea } from "./Textarea";

/**
 * # Textarea Component
 *
 * A flexible textarea component for multi-line text input with auto-resizing capabilities.
 * Built with accessibility and user experience in mind.
 *
 * ## Features
 * - Auto-resizing with `field-sizing-content` (modern browsers)
 * - Configurable minimum height
 * - Disabled state support
 * - Validation states (aria-invalid)
 * - Placeholder support
 * - Fully accessible with proper ARIA attributes
 *
 * ## Usage
 *
 * ### Basic
 * ```tsx
 * <Textarea placeholder="Enter your message..." />
 * ```
 *
 * ### Controlled
 * ```tsx
 * const [value, setValue] = useState("");
 * <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
 * ```
 *
 * ### With validation
 * ```tsx
 * <Textarea
 *   aria-invalid={hasError}
 *   aria-errormessage="error-message"
 * />
 * ```
 */
const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A multi-line text input component with auto-resizing and validation support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text shown when textarea is empty",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the textarea",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    value: {
      control: "text",
      description: "Current value of the textarea (for controlled component)",
      table: {
        type: { summary: "string" },
      },
    },
    rows: {
      control: "number",
      description: "Number of visible text lines",
      table: {
        type: { summary: "number" },
      },
    },
    maxLength: {
      control: "number",
      description: "Maximum number of characters allowed",
      table: {
        type: { summary: "number" },
      },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default textarea with placeholder text.
 */
export const Default: Story = {
  args: {
    placeholder: "Type something...",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText("Type something...");

    await step("Textarea should be in the document", async () => {
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute("data-slot", "textarea");
    });

    await step("Type text into textarea", async () => {
      await userEvent.type(textarea, "Hello, World!");
      expect(textarea).toHaveValue("Hello, World!");
    });

    await step("Clear and type multi-line text", async () => {
      await userEvent.clear(textarea);
      await userEvent.type(textarea, "Line 1{enter}Line 2{enter}Line 3");
      expect(textarea).toHaveValue("Line 1\nLine 2\nLine 3");
    });
  },
};

/**
 * Textarea in a disabled state.
 */
export const Disabled: Story = {
  args: {
    placeholder: "This textarea is disabled",
    disabled: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText("This textarea is disabled");

    await step("Textarea should be disabled", async () => {
      expect(textarea).toBeDisabled();
      expect(textarea).toHaveClass("disabled:opacity-50");
    });

    await step("Should not accept input when disabled", async () => {
      await userEvent.type(textarea, "This should not work");
      expect(textarea).toHaveValue("");
    });
  },
};

/**
 * Textarea with pre-filled value.
 */
export const WithValue: Story = {
  args: {
    value: "This is a pre-filled textarea with some content.\nIt supports multiple lines.",
  },
};

/**
 * Textarea with character limit and counter.
 */
export const WithCharacterLimit: Story = {
  render: function CharacterLimitExample() {
    const [value, setValue] = React.useState("");
    const maxLength = 200;

    return (
      <div className="space-y-2 w-96">
        <Textarea
          placeholder="Enter your message (max 200 characters)..."
          value={value}
          maxLength={maxLength}
          onChange={(e) => setValue(e.target.value)}
          aria-describedby="char-count"
        />
        <div id="char-count" className="text-xs text-right text-muted-foreground">
          {value.length} / {maxLength} characters
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText(/max 200 characters/i);

    await step("Character counter should update", async () => {
      await userEvent.type(textarea, "Testing character count");
      const counter = canvas.getByText(/\d+ \/ 200 characters/);
      expect(counter).toBeInTheDocument();
    });

    await step("Should not exceed max length", async () => {
      const longText = "a".repeat(250);
      await userEvent.clear(textarea);
      await userEvent.type(textarea, longText);
      expect(textarea).toHaveValue("a".repeat(200));
    });
  },
};

/**
 * Controlled textarea with state management.
 */
export const Controlled: Story = {
  render: function ControlledExample() {
    const [value, setValue] = React.useState("");

    return (
      <div className="space-y-4 w-96">
        <Textarea
          placeholder="Type something..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="p-3 rounded-md border">
          <div className="mb-2 text-xs font-medium text-muted-foreground">Current Value:</div>
          <div className="p-2 text-sm rounded bg-muted">
            {value || <span className="italic text-muted-foreground">(empty)</span>}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setValue("")}
          className="py-2 px-3 w-full text-sm rounded-md bg-secondary hover:bg-secondary/80"
        >
          Clear
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates controlled textarea with external state management.",
      },
    },
  },
};

/**
 * Form validation with error states.
 */
export const WithValidation: Story = {
  render: function ValidationExample() {
    const [value, setValue] = React.useState("");
    const [touched, setTouched] = React.useState(false);
    const minLength = 10;
    const isInvalid = touched && value.length > 0 && value.length < minLength;

    return (
      <div className="space-y-2 w-96">
        <label htmlFor="message" className="text-sm font-medium">
          Message *
        </label>
        <Textarea
          id="message"
          placeholder="Enter at least 10 characters..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? "error-message" : undefined}
        />
        {isInvalid && (
          <p id="error-message" className="text-sm text-red-500">
            Message must be at least {minLength} characters long
          </p>
        )}
        {!isInvalid && touched && value.length >= minLength && (
          <p className="text-sm text-green-600">✓ Looks good!</p>
        )}
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText(/at least 10 characters/i);

    await step("Should show error for invalid input", async () => {
      await userEvent.type(textarea, "Short");
      await userEvent.tab(); // Trigger blur

      const error = await canvas.findByText(/must be at least 10 characters/i);
      expect(error).toBeInTheDocument();
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    await step("Should show success for valid input", async () => {
      await userEvent.clear(textarea);
      await userEvent.type(textarea, "This is a valid message");
      await userEvent.tab();

      const success = await canvas.findByText(/Looks good!/i);
      expect(success).toBeInTheDocument();
      expect(textarea).toHaveAttribute("aria-invalid", "false");
    });
  },
  parameters: {
    docs: {
      description: {
        story: "Shows validation with error states and aria-invalid attribute.",
      },
    },
  },
};

/**
 * Complete form example with textarea.
 */
export const FormIntegration: Story = {
  render: function FormExample() {
    const [formData, setFormData] = React.useState({
      title: "",
      description: "",
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.title.trim()) {
        newErrors.title = "Title is required";
      }
      if (!formData.description.trim()) {
        newErrors.description = "Description is required";
      } else if (formData.description.length < 20) {
        newErrors.description = "Description must be at least 20 characters";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        setSubmitted(true);
        setTimeout(() => {
          setFormData({ title: "", description: "" });
          setSubmitted(false);
        }, 3000);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 w-96">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="py-2 px-3 w-full text-sm rounded-md border border-input"
            placeholder="Enter a title..."
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description *
          </label>
          <Textarea
            id="description"
            placeholder="Enter a detailed description..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            aria-invalid={!!errors.description}
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
        </div>

        <button
          type="submit"
          className="py-2 px-4 w-full text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Submit
        </button>

        {submitted && (
          <div className="p-3 text-sm text-green-800 bg-green-50 rounded-md border border-green-200">
            ✓ Form submitted successfully!
          </div>
        )}
      </form>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Should show validation errors on submit", async () => {
      const submitButton = canvas.getByRole("button", { name: /submit/i });
      await userEvent.click(submitButton);

      const titleError = await canvas.findByText("Title is required");
      const descError = await canvas.findByText("Description is required");
      expect(titleError).toBeInTheDocument();
      expect(descError).toBeInTheDocument();
    });

    await step("Should validate minimum length", async () => {
      const titleInput = canvas.getByPlaceholderText("Enter a title...");
      const descTextarea = canvas.getByPlaceholderText(/detailed description/i);

      await userEvent.type(titleInput, "Test Title");
      await userEvent.type(descTextarea, "Too short");

      const submitButton = canvas.getByRole("button", { name: /submit/i });
      await userEvent.click(submitButton);

      const error = await canvas.findByText(/must be at least 20 characters/i);
      expect(error).toBeInTheDocument();
    });

    await step("Should submit successfully with valid data", async () => {
      const titleInput = canvas.getByPlaceholderText("Enter a title...");
      const descTextarea = canvas.getByPlaceholderText(/detailed description/i);

      await userEvent.clear(titleInput);
      await userEvent.clear(descTextarea);

      await userEvent.type(titleInput, "Valid Title");
      await userEvent.type(
        descTextarea,
        "This is a valid description with more than 20 characters"
      );

      const submitButton = canvas.getByRole("button", { name: /submit/i });
      await userEvent.click(submitButton);

      const success = await canvas.findByText(/submitted successfully/i);
      expect(success).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story: "Complete form with validation, error handling, and success feedback.",
      },
    },
  },
};

/**
 * Textarea with custom styling.
 */
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Textarea
        placeholder="Custom styled textarea with monospace font..."
        className="resize-none min-h-32"
      />
      <div className="p-3 text-xs rounded-md border">
        <div className="font-medium">Applied styles:</div>
        <ul className="mt-2 space-y-1 text-muted-foreground">
          <li>• min-h-32 (minimum height)</li>
          <li>• resize-none (disable resizing)</li>
          <li>• font-mono (monospace font)</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates custom styling with className prop while keeping default responsive font sizing.",
      },
    },
  },
};
