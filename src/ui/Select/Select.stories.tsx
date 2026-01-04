import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./Select";
import { expect, userEvent, waitFor, within } from "storybook/test";
import * as React from "react";

/**
 * # Select Component
 *
 * A customizable select dropdown component built on Radix UI Select.
 * Provides an accessible and feature-rich way to select from a list of options.
 *
 * ## Features
 * - Fully accessible with keyboard navigation
 * - Grouped options with labels
 * - Separators for visual organization
 * - Two sizes: default and small
 * - Controlled and uncontrolled modes
 * - Validation states (aria-invalid)
 * - Disabled states
 * - Placeholder support
 *
 * ## Usage
 *
 * ### Basic
 * ```tsx
 * <Select>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select an option" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="option1">Option 1</SelectItem>
 *     <SelectItem value="option2">Option 2</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 *
 * ### Controlled
 * ```tsx
 * const [value, setValue] = useState("");
 * <Select value={value} onValueChange={setValue}>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select..." />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="option1">Option 1</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 *
 * ### With Groups
 * ```tsx
 * <SelectContent>
 *   <SelectGroup>
 *     <SelectLabel>Fruits</SelectLabel>
 *     <SelectItem value="apple">Apple</SelectItem>
 *   </SelectGroup>
 *   <SelectSeparator />
 *   <SelectGroup>
 *     <SelectLabel>Vegetables</SelectLabel>
 *     <SelectItem value="carrot">Carrot</SelectItem>
 *   </SelectGroup>
 * </SelectContent>
 * ```
 */
const meta = {
  title: "Components/Select",
  component: Select,
  subcomponents: {
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectLabel,
    SelectSeparator,
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable select dropdown built on Radix UI with full keyboard navigation and accessibility.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic select with simple options.
 */
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
        <SelectItem value="mango">Mango</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step("Select trigger should be in document", async () => {
      const trigger = canvas.getByRole("combobox");
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute("data-slot", "select-trigger");
    });

    await step("Open select and choose an option", async () => {
      const trigger = canvas.getByRole("combobox");
      await userEvent.click(trigger);

      // Wait for options to appear in portal
      const bananaOption = await body.findByRole("option", { name: "Banana" });
      expect(bananaOption).toBeInTheDocument();
      await userEvent.click(bananaOption);

      // Verify selection
      await waitFor(
        () => {
          expect(trigger).toHaveTextContent("Banana");
        },
        { timeout: 2000 }
      );
    });
  },
};

/**
 * Select with grouped options and labels.
 */
export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select food" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
          <SelectItem value="spinach">Spinach</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Proteins</SelectLabel>
          <SelectItem value="chicken">Chicken</SelectItem>
          <SelectItem value="beef">Beef</SelectItem>
          <SelectItem value="tofu">Tofu</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: "Select with multiple groups, labels, and separators for better organization.",
      },
    },
  },
};

/**
 * Controlled select with state management.
 */
export const Controlled: Story = {
  render: function ControlledExample() {
    const [value, setValue] = React.useState("");

    const options = [
      { value: "js", label: "JavaScript" },
      { value: "ts", label: "TypeScript" },
      { value: "py", label: "Python" },
      { value: "rust", label: "Rust" },
      { value: "go", label: "Go" },
    ];

    return (
      <div className="w-80 space-y-4">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="rounded-md border p-3">
          <div className="text-muted-foreground mb-2 text-xs font-medium">Selected Value:</div>
          <div className="font-mono text-sm">
            {value || <span className="text-muted-foreground italic">(none)</span>}
          </div>
        </div>
        <button
          onClick={() => setValue("")}
          className="bg-secondary hover:bg-secondary/80 w-full rounded-md px-3 py-2 text-sm"
        >
          Clear Selection
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates controlled select with external state management.",
      },
    },
  },
};

/**
 * Small size variant.
 */
export const SmallSize: Story = {
  render: () => (
    <Select>
      <SelectTrigger size="sm">
        <SelectValue placeholder="Small select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="xs">Extra Small</SelectItem>
        <SelectItem value="sm">Small</SelectItem>
        <SelectItem value="md">Medium</SelectItem>
        <SelectItem value="lg">Large</SelectItem>
        <SelectItem value="xl">Extra Large</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: "Select with small size variant (h-8 instead of h-9).",
      },
    },
  },
};

/**
 * Disabled select.
 */
export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger>
        <SelectValue placeholder="This select is disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Select should be disabled", async () => {
      const trigger = canvas.getByRole("combobox");
      expect(trigger).toBeDisabled();
    });

    await step("Should not open when disabled", async () => {
      const trigger = canvas.getByRole("combobox");
      await userEvent.click(trigger);

      // Content should not appear
      await new Promise((resolve) => setTimeout(resolve, 100));
      const content = document.querySelector('[data-slot="select-content"]');
      expect(content).not.toBeInTheDocument();
    });
  },
};

/**
 * Select with disabled items.
 */
export const DisabledItems: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Free Plan</SelectItem>
        <SelectItem value="basic">Basic Plan</SelectItem>
        <SelectItem value="pro" disabled>
          Pro Plan (Coming Soon)
        </SelectItem>
        <SelectItem value="enterprise" disabled>
          Enterprise (Contact Us)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: "Select with some disabled options that cannot be selected.",
      },
    },
  },
};

/**
 * Select with pre-selected value.
 */
export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="typescript">
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="javascript">JavaScript</SelectItem>
        <SelectItem value="typescript">TypeScript</SelectItem>
        <SelectItem value="python">Python</SelectItem>
        <SelectItem value="rust">Rust</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: "Select with a default value (TypeScript) pre-selected.",
      },
    },
  },
};

/**
 * Form integration with validation.
 */
export const FormIntegration: Story = {
  render: function FormExample() {
    const [formData, setFormData] = React.useState({
      name: "",
      country: "",
      role: "",
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [submitted, setSubmitted] = React.useState(false);

    const countries = [
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "ca", label: "Canada" },
      { value: "au", label: "Australia" },
      { value: "de", label: "Germany" },
    ];

    const roles = [
      { value: "developer", label: "Developer" },
      { value: "designer", label: "Designer" },
      { value: "manager", label: "Manager" },
      { value: "other", label: "Other" },
    ];

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.country) newErrors.country = "Country is required";
      if (!formData.role) newErrors.role = "Role is required";

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        setSubmitted(true);
        setTimeout(() => {
          setFormData({ name: "", country: "", role: "" });
          setSubmitted(false);
        }, 3000);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name *
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border-input w-full rounded-md border px-3 py-2 text-sm"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Country *</label>
          <Select
            value={formData.country}
            onValueChange={(value) => setFormData({ ...formData, country: value })}
          >
            <SelectTrigger className="w-full" aria-invalid={!!errors.country}>
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Role *</label>
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
          >
            <SelectTrigger className="w-full" aria-invalid={!!errors.role}>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
        </div>

        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium"
        >
          Submit
        </button>

        {submitted && (
          <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            ✓ Form submitted successfully!
          </div>
        )}
      </form>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step("Should show validation errors on empty submit", async () => {
      const submitButton = canvas.getByRole("button", { name: /submit/i });
      await userEvent.click(submitButton);

      const nameError = await canvas.findByText("Name is required");
      const countryError = await canvas.findByText("Country is required");
      expect(nameError).toBeInTheDocument();
      expect(countryError).toBeInTheDocument();
    });

    await step("Should submit successfully with valid data", async () => {
      const nameInput = canvas.getByPlaceholderText("John Doe");
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, "Jane Smith");

      // Select country
      const countryTriggers = canvas.getAllByRole("combobox");
      await userEvent.click(countryTriggers[0]);

      // Wait for select content to appear in portal and click option
      const ukOption = await body.findByRole("option", { name: "United Kingdom" });
      await userEvent.click(ukOption);

      // Wait a bit for state to update
      await waitFor(
        () => {
          expect(countryTriggers[0]).toHaveTextContent("United Kingdom");
        },
        { timeout: 2000 }
      );

      // Select role
      await userEvent.click(countryTriggers[1]);

      // Wait for role options
      const devOption = await body.findByRole("option", { name: "Developer" });
      await userEvent.click(devOption);

      // Verify role selection
      await waitFor(
        () => {
          expect(countryTriggers[1]).toHaveTextContent("Developer");
        },
        { timeout: 2000 }
      );

      // Submit form
      const submitButton = canvas.getByRole("button", { name: /submit/i });
      await userEvent.click(submitButton);

      // Wait for success message
      const successMessage = await canvas.findByText(
        (_content, element) => {
          return element?.textContent?.includes("Form submitted successfully") ?? false;
        },
        {},
        { timeout: 3000 }
      );
      expect(successMessage).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story: "Complete form example with multiple selects, validation, and error handling.",
      },
    },
  },
};

/**
 * Select with custom width.
 */
export const CustomWidth: Story = {
  render: () => (
    <div className="space-y-4">
      <Select>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Wide select (300px)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Long option text that might wrap</SelectItem>
          <SelectItem value="option2">Another long option for testing</SelectItem>
          <SelectItem value="option3">Yet another long option text here</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Narrow" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="xs">XS</SelectItem>
          <SelectItem value="sm">SM</SelectItem>
          <SelectItem value="md">MD</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates custom widths using className on SelectTrigger.",
      },
    },
  },
};

/**
 * Select with many options to show scrolling.
 */
export const ScrollableContent: Story = {
  render: () => {
    const countries = [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Argentina",
      "Australia",
      "Austria",
      "Bangladesh",
      "Belgium",
      "Brazil",
      "Canada",
      "China",
      "Colombia",
      "Denmark",
      "Egypt",
      "Finland",
      "France",
      "Germany",
      "Greece",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Israel",
      "Italy",
      "Japan",
      "Kenya",
      "Mexico",
      "Netherlands",
      "New Zealand",
      "Nigeria",
      "Norway",
      "Pakistan",
      "Philippines",
      "Poland",
      "Portugal",
      "Russia",
      "Saudi Arabia",
      "South Africa",
      "South Korea",
      "Spain",
      "Sweden",
      "Switzerland",
      "Thailand",
      "Turkey",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "Vietnam",
    ];

    return (
      <Select>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country} value={country.toLowerCase().replace(/\s+/g, "-")}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Select with many options showing automatic scrolling with scroll indicators.",
      },
    },
  },
};
