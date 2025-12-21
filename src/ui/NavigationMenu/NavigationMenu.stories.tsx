import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor } from "storybook/test";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./NavigationMenu";
import {
  BookOpen,
  Layers,
  Users,
  Package,
  Home,
  Star,
  Smartphone,
  Shirt,
  Leaf,
} from "lucide-react";

const meta = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  subcomponents: {
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    viewport: {
      control: "boolean",
      description: "Enable viewport mode (shared viewport) or popover mode",
    },
  },
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4">
              <p className="text-sm text-muted-foreground">
                Learn how to get started with our platform
              </p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4">
              <p className="text-sm text-muted-foreground">
                Browse our component library
              </p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Pricing</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4">
              <p className="text-sm text-muted-foreground">
                View our pricing plans
              </p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify navigation menu renders", async () => {
      const menu = canvasElement.querySelector('[data-slot="navigation-menu"]');
      expect(menu).toBeInTheDocument();
      expect(menu).toHaveAttribute("data-viewport", "true");
    });

    await step("Click trigger to open content", async () => {
      const trigger = canvasElement.querySelector(
        '[data-slot="navigation-menu-trigger"]',
      );
      expect(trigger).toBeInTheDocument();

      await userEvent.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("data-state", "open");
      });
    });
  },
};

export const WithIcons: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <BookOpen className="mr-2 size-4" />
            Documentation
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4 space-y-2">
              <NavigationMenuLink href="#" className="flex items-center">
                <BookOpen className="mr-2 size-4" />
                <div>
                  <div className="font-medium">Getting Started</div>
                  <div className="text-xs text-muted-foreground">
                    Quick start guide
                  </div>
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink href="#" className="flex items-center">
                <Layers className="mr-2 size-4" />
                <div>
                  <div className="font-medium">API Reference</div>
                  <div className="text-xs text-muted-foreground">
                    Complete API docs
                  </div>
                </div>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Users className="mr-2 size-4" />
            Community
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4 space-y-2">
              <NavigationMenuLink href="#" className="flex items-center">
                <Users className="mr-2 size-4" />
                <div>
                  <div className="font-medium">Discord</div>
                  <div className="text-xs text-muted-foreground">
                    Join our community
                  </div>
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink href="#" className="flex items-center">
                <Star className="mr-2 size-4" />
                <div>
                  <div className="font-medium">GitHub</div>
                  <div className="text-xs text-muted-foreground">
                    Star us on GitHub
                  </div>
                </div>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify icons render in triggers", async () => {
      const triggers = canvasElement.querySelectorAll(
        '[data-slot="navigation-menu-trigger"]',
      );
      expect(triggers.length).toBeGreaterThan(0);
    });

    await step("Open menu and verify link icons", async () => {
      const trigger = canvasElement.querySelector(
        '[data-slot="navigation-menu-trigger"]',
      );
      await userEvent.click(trigger);

      await waitFor(() => {
        const links = canvasElement.querySelectorAll(
          '[data-slot="navigation-menu-link"]',
        );
        expect(links.length).toBeGreaterThan(0);
      });
    });
  },
};

export const DocumentationMenu: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[500px] p-4">
              <div className="space-y-2">
                <NavigationMenuLink href="#">
                  <div className="font-medium">Installation</div>
                  <div className="text-xs text-muted-foreground">
                    Install and configure the library
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink href="#">
                  <div className="font-medium">Quick Start</div>
                  <div className="text-xs text-muted-foreground">
                    Get up and running in 5 minutes
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink href="#">
                  <div className="font-medium">Tutorial</div>
                  <div className="text-xs text-muted-foreground">
                    Step-by-step guide for beginners
                  </div>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[600px] p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Form</h4>
                  <NavigationMenuLink href="#">Button</NavigationMenuLink>
                  <NavigationMenuLink href="#">Input</NavigationMenuLink>
                  <NavigationMenuLink href="#">Select</NavigationMenuLink>
                  <NavigationMenuLink href="#">Checkbox</NavigationMenuLink>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Layout</h4>
                  <NavigationMenuLink href="#">Card</NavigationMenuLink>
                  <NavigationMenuLink href="#">Tabs</NavigationMenuLink>
                  <NavigationMenuLink href="#">Dialog</NavigationMenuLink>
                  <NavigationMenuLink href="#">Accordion</NavigationMenuLink>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4">
              <div className="space-y-2">
                <NavigationMenuLink href="#">
                  <div className="font-medium">API Docs</div>
                  <div className="text-xs text-muted-foreground">
                    Complete API reference
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink href="#">
                  <div className="font-medium">Examples</div>
                  <div className="text-xs text-muted-foreground">
                    Code examples and patterns
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink href="#">
                  <div className="font-medium">GitHub</div>
                  <div className="text-xs text-muted-foreground">
                    View source code
                  </div>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify all menu items render", async () => {
      const triggers = canvasElement.querySelectorAll(
        '[data-slot="navigation-menu-trigger"]',
      );
      expect(triggers).toHaveLength(3);
    });

    await step("Open Components menu and verify grid layout", async () => {
      const triggers = canvasElement.querySelectorAll(
        '[data-slot="navigation-menu-trigger"]',
      );
      const componentsMenu = triggers[1];
      await userEvent.click(componentsMenu);

      await waitFor(() => {
        const content = canvasElement.querySelector(
          '[data-slot="navigation-menu-content"]',
        );
        expect(content).toBeVisible();
      });
    });
  },
};

export const ViewportMode: Story = {
  render: () => (
    <NavigationMenu viewport={true}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4">
              <p className="text-sm">Browse our products</p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4">
              <p className="text-sm">Explore our solutions</p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Company</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4">
              <p className="text-sm">Learn about us</p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify viewport is rendered", async () => {
      const menu = canvasElement.querySelector('[data-slot="navigation-menu"]');
      expect(menu).toHaveAttribute("data-viewport", "true");

      const viewport = canvasElement.querySelector(
        '[data-slot="navigation-menu-viewport"]',
      );
      expect(viewport).toBeInTheDocument();
    });

    await step("Switch between items in shared viewport", async () => {
      const triggers = canvasElement.querySelectorAll(
        '[data-slot="navigation-menu-trigger"]',
      );

      await userEvent.click(triggers[0]);
      await waitFor(() => {
        expect(triggers[0]).toHaveAttribute("data-state", "open");
      });

      await userEvent.click(triggers[1]);
      await waitFor(() => {
        expect(triggers[1]).toHaveAttribute("data-state", "open");
      });
    });
  },
};

export const PopoverMode: Story = {
  render: () => (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4">
              <p className="text-sm">View our features</p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Pricing</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4">
              <p className="text-sm">See pricing plans</p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify viewport is not rendered", async () => {
      const menu = canvasElement.querySelector('[data-slot="navigation-menu"]');
      expect(menu).toHaveAttribute("data-viewport", "false");

      const viewport = canvasElement.querySelector(
        '[data-slot="navigation-menu-viewport"]',
      );
      expect(viewport).not.toBeInTheDocument();
    });

    await step("Open menu item in popover mode", async () => {
      const trigger = canvasElement.querySelector(
        '[data-slot="navigation-menu-trigger"]',
      );
      await userEvent.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("data-state", "open");
      });
    });
  },
};

export const WithComplexContent: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shop by Category</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[600px] p-6">
              <div className="grid grid-cols-3 gap-4">
                <NavigationMenuLink href="#" className="text-center">
                  <Package className="mx-auto mb-2 size-8" />
                  <div className="font-medium">Electronics</div>
                  <div className="text-xs text-muted-foreground">
                    Latest gadgets
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink href="#" className="text-center">
                  <Shirt className="mx-auto mb-2 size-8" />
                  <div className="font-medium">Clothing</div>
                  <div className="text-xs text-muted-foreground">
                    Fashion trends
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink href="#" className="text-center">
                  <Home className="mx-auto mb-2 size-8" />
                  <div className="font-medium">Home</div>
                  <div className="text-xs text-muted-foreground">
                    Decor & furniture
                  </div>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Open menu and verify grid layout", async () => {
      const trigger = canvasElement.querySelector(
        '[data-slot="navigation-menu-trigger"]',
      );
      await userEvent.click(trigger);

      await waitFor(() => {
        const links = canvasElement.querySelectorAll(
          '[data-slot="navigation-menu-link"]',
        );
        expect(links).toHaveLength(3);
      });
    });
  },
};

export const ManyItems: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[300px] p-4">
              <p className="text-sm">Content for item 1</p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Item 2</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[300px] p-4">
              <p className="text-sm">Content for item 2</p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Item 3</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[300px] p-4">
              <p className="text-sm">Content for item 3</p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Item 4</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[300px] p-4">
              <p className="text-sm">Content for item 4</p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Item 5</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[300px] p-4">
              <p className="text-sm">Content for item 5</p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify all 5 items render", async () => {
      const triggers = canvasElement.querySelectorAll(
        '[data-slot="navigation-menu-trigger"]',
      );
      expect(triggers).toHaveLength(5);
    });

    await step("Navigate through multiple items", async () => {
      const triggers = canvasElement.querySelectorAll(
        '[data-slot="navigation-menu-trigger"]',
      );

      await userEvent.click(triggers[0]);
      await waitFor(() => {
        expect(triggers[0]).toHaveAttribute("data-state", "open");
      });

      await userEvent.click(triggers[2]);
      await waitFor(() => {
        expect(triggers[2]).toHaveAttribute("data-state", "open");
      });
    });
  },
};

export const WithDescriptions: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[500px] p-4 space-y-2">
              <NavigationMenuLink href="#">
                <div className="font-medium">Introduction</div>
                <div className="text-xs text-muted-foreground">
                  Learn the basics and get started quickly with our platform
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div className="font-medium">Advanced Topics</div>
                <div className="text-xs text-muted-foreground">
                  Deep dive into advanced features and best practices
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div className="font-medium">Video Tutorials</div>
                <div className="text-xs text-muted-foreground">
                  Watch step-by-step video guides and walkthroughs
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <div className="font-medium">Case Studies</div>
                <div className="text-xs text-muted-foreground">
                  See how others are using our platform successfully
                </div>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Open menu and verify descriptions", async () => {
      const trigger = canvasElement.querySelector(
        '[data-slot="navigation-menu-trigger"]',
      );
      await userEvent.click(trigger);

      await waitFor(() => {
        const links = canvasElement.querySelectorAll(
          '[data-slot="navigation-menu-link"]',
        );
        expect(links).toHaveLength(4);
        expect(canvasElement.textContent).toContain(
          "Learn the basics and get started quickly",
        );
      });
    });
  },
};

export const MultipleCategories: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Shirt className="mr-2 size-4" />
            Clothing
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4 space-y-2">
              <NavigationMenuLink href="#" className="flex items-center">
                <Users className="mr-2" />
                Men's Clothing
              </NavigationMenuLink>
              <NavigationMenuLink href="#" className="flex items-center">
                <Users className="mr-2" />
                Women's Clothing
              </NavigationMenuLink>
              <NavigationMenuLink href="#" className="flex items-center">
                <Users className="mr-2" />
                Kids' Clothing
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Smartphone className="mr-2 size-4" />
            Electronics
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4 space-y-2">
              <NavigationMenuLink href="#" className="flex items-center">
                <Smartphone className="mr-2" />
                Smartphones
              </NavigationMenuLink>
              <NavigationMenuLink href="#" className="flex items-center">
                <Package className="mr-2" />
                Laptops
              </NavigationMenuLink>
              <NavigationMenuLink href="#" className="flex items-center">
                <Star className="mr-2" />
                Accessories
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Home className="mr-2 size-4" />
            Home & Garden
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4 space-y-2">
              <NavigationMenuLink href="#" className="flex items-center">
                <Home className="mr-2" />
                Furniture
              </NavigationMenuLink>
              <NavigationMenuLink href="#" className="flex items-center">
                <Leaf className="mr-2" />
                Garden Tools
              </NavigationMenuLink>
              <NavigationMenuLink href="#" className="flex items-center">
                <Star className="mr-2" />
                Decor
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify all categories render", async () => {
      const triggers = canvasElement.querySelectorAll(
        '[data-slot="navigation-menu-trigger"]',
      );
      expect(triggers).toHaveLength(3);
    });

    await step("Navigate between categories", async () => {
      const triggers = canvasElement.querySelectorAll(
        '[data-slot="navigation-menu-trigger"]',
      );

      await userEvent.click(triggers[0]);
      await waitFor(() => {
        expect(canvasElement.textContent).toContain("Men's Clothing");
      });

      await userEvent.click(triggers[1]);
      await waitFor(() => {
        expect(canvasElement.textContent).toContain("Smartphones");
      });
    });
  },
};

export const ChevronRotation: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Click to see chevron rotate
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4">
              <p className="text-sm">
                The chevron icon in the trigger rotates 180 degrees when this
                content is open
              </p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Verify chevron rotates when opened", async () => {
      const trigger = canvasElement.querySelector(
        '[data-slot="navigation-menu-trigger"]',
      );
      expect(trigger).toHaveAttribute("data-state", "closed");

      await userEvent.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("data-state", "open");
        const chevron = trigger.querySelector("svg");
        expect(chevron).toHaveClass("group-data-[state=open]:rotate-180");
      });
    });
  },
};
