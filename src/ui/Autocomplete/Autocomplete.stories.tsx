import type { Meta, StoryObj } from "@storybook/react-vite";
import { Autocomplete } from "./Autocomplete";
import { fn } from "storybook/test";
import * as React from "react";

/**
 * # Autocomplete Component
 *
 * A flexible autocomplete/combobox component built on top of Radix UI Popover and cmdk.
 * Supports both client-side and server-side filtering, with built-in debouncing for async operations.
 *
 * ## Features
 * - Client-side filtering (default) - Built-in search filtering
 * - Server-side filtering - Provide `onFilterChange` callback for async data fetching
 * - Controlled state - Manage value externally via `value` and `onValueChange`
 * - Loading states - Show spinner during async operations
 * - Customizable messages - Placeholder, filter input, and empty state
 * - Auto-debouncing - 300ms debounce on filter changes when using `onFilterChange`
 *
 * ## Usage
 *
 * ### Client-side filtering (static data)
 * ```tsx
 * <Autocomplete
 *   items={items}
 *   placeholder="Select an option..."
 *   onValueChange={(value) => console.log(value)}
 * />
 * ```
 *
 * ### Server-side filtering (async data)
 * ```tsx
 * const [items, setItems] = useState([]);
 * const [isLoading, setIsLoading] = useState(false);
 *
 * <Autocomplete
 *   items={items}
 *   isLoading={isLoading}
 *   onFilterChange={async (search) => {
 *     setIsLoading(true);
 *     const data = await fetchFromAPI(search);
 *     setItems(data);
 *     setIsLoading(false);
 *   }}
 *   onValueChange={(value) => console.log(value)}
 * />
 * ```
 */
const meta = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A searchable autocomplete component with support for both client-side and server-side filtering.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description:
        "The currently selected value. Use with `onValueChange` for controlled component.",
      table: {
        type: { summary: "string" },
      },
    },
    items: {
      control: "object",
      description:
        "Array of items to display. Each item must have `value` and `label` properties.",
      table: {
        type: { summary: "Array<{ value: string; label: string }>" },
      },
    },
    placeholder: {
      control: "text",
      description:
        "Placeholder text shown in the trigger button when no value is selected.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Select an option..." },
      },
    },
    filterPlaceholder: {
      control: "text",
      description: "Placeholder text for the search input inside the popover.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Type to filter..." },
      },
    },
    emptyMessage: {
      control: "text",
      description: "Message displayed when no items match the filter.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "No results found." },
      },
    },
    isLoading: {
      control: "boolean",
      description:
        "Shows a loading spinner instead of the chevron icon. Use during async operations.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onFilterChange: {
      description:
        "Callback fired when the filter value changes (debounced 300ms). When provided, disables client-side filtering. Use for server-side filtering.",
      table: {
        type: { summary: "(value: string) => void" },
      },
    },
    onValueChange: {
      description:
        "Callback fired when a value is selected. Use for controlled component pattern.",
      table: {
        type: { summary: "(value: string) => void" },
      },
    },
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic autocomplete with static data and client-side filtering.
 * No callbacks needed - filtering is handled automatically.
 */
export const Default: Story = {
  args: {
    placeholder: "Select a framework...",
    filterPlaceholder: "Search frameworks...",
    emptyMessage: "No framework found.",
    items: [
      { value: "next", label: "Next.js" },
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
      { value: "angular", label: "Angular" },
      { value: "solid", label: "Solid" },
    ],
  },
};

/**
 * Controlled component example - manage the selected value externally.
 * Use `value` prop and `onValueChange` callback to sync state.
 */
export const Controlled: Story = {
  render: function ControlledExample() {
    const [value, setValue] = React.useState<string>("");

    const frameworks = [
      { value: "next", label: "Next.js" },
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
      { value: "angular", label: "Angular" },
      { value: "solid", label: "Solid" },
    ];

    return (
      <div className="w-80 space-y-4">
        <Autocomplete
          value={value}
          placeholder="Select a framework..."
          filterPlaceholder="Search frameworks..."
          emptyMessage="No framework found."
          items={frameworks}
          onValueChange={setValue}
        />
        <div className="rounded-md border p-3 text-center text-sm">
          <div className="text-muted-foreground mb-1 font-medium">
            Selected Value:
          </div>
          <div className="font-mono">{value || "(none)"}</div>
        </div>
        <button
          onClick={() => setValue("")}
          className="w-full rounded-md bg-secondary px-3 py-2 text-sm hover:bg-secondary/80"
        >
          Clear Selection
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how to control the selected value from parent component.",
      },
    },
  },
};

/**
 * Async data fetching with server-side filtering.
 * Simulates an API call with 500ms delay. The component automatically debounces
 * filter changes (300ms) to reduce unnecessary API calls.
 */
export const ServerSideFiltering: Story = {
  render: function ServerSideExample() {
    const [value, setValue] = React.useState<string>("");
    const [items, setItems] = React.useState<
      { value: string; label: string }[]
    >([]);
    const [isLoading, setIsLoading] = React.useState(false);

    // Simulated API data - in real app, this would come from your backend
    const allCountries = [
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "ca", label: "Canada" },
      { value: "au", label: "Australia" },
      { value: "de", label: "Germany" },
      { value: "fr", label: "France" },
      { value: "es", label: "Spain" },
      { value: "it", label: "Italy" },
      { value: "jp", label: "Japan" },
      { value: "cn", label: "China" },
      { value: "br", label: "Brazil" },
      { value: "in", label: "India" },
      { value: "mx", label: "Mexico" },
      { value: "ru", label: "Russia" },
      { value: "za", label: "South Africa" },
    ];

    const fetchCountries = async (searchTerm: string) => {
      setIsLoading(true);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Filter results based on search term
      const filtered = searchTerm
        ? allCountries.filter((country) =>
            country.label.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        : allCountries;

      setItems(filtered);
      setIsLoading(false);
    };

    React.useEffect(() => {
      // Initial data load
      fetchCountries("");
    }, []);

    return (
      <div className="w-80 space-y-4">
        <Autocomplete
          value={value}
          placeholder="Select a country..."
          filterPlaceholder="Search countries..."
          emptyMessage="No countries found. Try a different search."
          items={items}
          isLoading={isLoading}
          onFilterChange={fetchCountries}
          onValueChange={setValue}
        />
        <div className="rounded-md border p-3 text-center text-sm">
          <div className="text-muted-foreground mb-1 font-medium">
            API Status:
          </div>
          <div className="flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <div className="size-2 animate-pulse rounded-full bg-yellow-500" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <div className="size-2 rounded-full bg-green-500" />
                <span>Ready ({items.length} results)</span>
              </>
            )}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows server-side filtering with loading states. Type to trigger filtered API calls (debounced 300ms).",
      },
    },
  },
};

/**
 * Pre-selected value example.
 * Useful for edit forms where you need to show existing data.
 */
export const WithPreselectedValue: Story = {
  args: {
    placeholder: "Select a language...",
    filterPlaceholder: "Search languages...",
    value: "typescript",
    items: [
      { value: "javascript", label: "JavaScript" },
      { value: "typescript", label: "TypeScript" },
      { value: "python", label: "Python" },
      { value: "rust", label: "Rust" },
      { value: "go", label: "Go" },
      { value: "java", label: "Java" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Shows autocomplete with a pre-selected value (TypeScript).",
      },
    },
  },
};

/**
 * Loading state example.
 * Shows the spinner when data is being fetched.
 */
export const LoadingState: Story = {
  args: {
    placeholder: "Loading...",
    filterPlaceholder: "Search...",
    isLoading: true,
    items: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Displays loading state with spinner while data is being fetched.",
      },
    },
  },
};

/**
 * Empty state example.
 * Shows custom message when no items are available or match the filter.
 */
export const EmptyState: Story = {
  args: {
    placeholder: "Select an item...",
    filterPlaceholder: "Search...",
    emptyMessage: "😔 No items available. Please check back later.",
    items: [],
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates empty state with custom message.",
      },
    },
  },
};

/**
 * Large dataset example.
 * Autocomplete handles large lists efficiently with virtualization from cmdk.
 */
export const LargeDataset: Story = {
  render: function LargeDatasetExample() {
    const [value, setValue] = React.useState<string>("");

    // Generate 1000 items
    const items = React.useMemo(
      () =>
        Array.from({ length: 1000 }, (_, i) => ({
          value: `item-${i}`,
          label: `Item ${i + 1} - ${["Alpha", "Beta", "Gamma", "Delta", "Epsilon"][i % 5]}`,
        })),
      [],
    );

    return (
      <div className="w-80 space-y-4">
        <Autocomplete
          value={value}
          placeholder="Select from 1000 items..."
          filterPlaceholder="Type to search..."
          emptyMessage="No matching items found."
          items={items}
          onValueChange={setValue}
        />
        <div className="rounded-md border p-3 text-center text-sm">
          <div className="text-muted-foreground mb-1 text-xs">
            Total: {items.length} items
          </div>
          <div className="font-mono text-xs">{value || "(none selected)"}</div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Efficiently handles large datasets (1000+ items) with fast client-side filtering.",
      },
    },
  },
};

/**
 * Real-world form integration example.
 * Shows how to use autocomplete in a typical form scenario with validation.
 */
export const FormIntegration: Story = {
  render: function FormExample() {
    const [formData, setFormData] = React.useState({
      name: "",
      role: "",
      department: "",
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const roles = [
      { value: "developer", label: "Software Developer" },
      { value: "designer", label: "UI/UX Designer" },
      { value: "manager", label: "Project Manager" },
      { value: "analyst", label: "Data Analyst" },
      { value: "qa", label: "QA Engineer" },
    ];

    const departments = [
      { value: "engineering", label: "Engineering" },
      { value: "design", label: "Design" },
      { value: "product", label: "Product" },
      { value: "marketing", label: "Marketing" },
      { value: "sales", label: "Sales" },
    ];

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.role) newErrors.role = "Role is required";
      if (!formData.department) newErrors.department = "Department is required";

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert(`Form submitted!\n${JSON.stringify(formData, null, 2)}`);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Role *</label>
          <Autocomplete
            value={formData.role}
            placeholder="Select your role..."
            filterPlaceholder="Search roles..."
            items={roles}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
          />
          {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Department *</label>
          <Autocomplete
            value={formData.department}
            placeholder="Select your department..."
            filterPlaceholder="Search departments..."
            items={departments}
            onValueChange={(value) =>
              setFormData({ ...formData, department: value })
            }
          />
          {errors.department && (
            <p className="text-sm text-red-500">{errors.department}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Submit
        </button>

        <div className="rounded-md bg-muted p-3 text-xs">
          <div className="font-medium">Form State:</div>
          <pre className="mt-2">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complete form integration example with validation and multiple autocomplete fields.",
      },
    },
  },
};
