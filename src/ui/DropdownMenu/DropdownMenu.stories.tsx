import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor } from "storybook/test";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup,
} from "./DropdownMenu";
import { Button } from "../Button/Button";
import {
  User,
  Settings,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  Users,
  Cloud,
  Github,
  LifeBuoy,
  Keyboard,
} from "lucide-react";
import * as React from "react";

const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  subcomponents: {
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Click trigger to open menu", async () => {
      const trigger = canvasElement.querySelector(
        '[data-slot="dropdown-menu-trigger"]',
      );
      expect(trigger).toBeInTheDocument();

      await userEvent.click(trigger!);

      await waitFor(() => {
        // Content is in a portal, check document body
        expect(document.body.textContent).toContain("Profile");
      });
    });
  },
};

export const WithIcons: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User className="mr-2 size-4" />
          Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <User className="mr-2 size-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 size-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 size-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Open menu and verify icons", async () => {
      const trigger = canvasElement.querySelector(
        '[data-slot="dropdown-menu-trigger"]',
      );
      await userEvent.click(trigger!);

      await waitFor(() => {
        // Content is in a portal
        expect(document.body.textContent).toContain("Settings");
      });
    });
  },
};

export const WithLabelsAndSeparators: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 size-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 size-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Team</DropdownMenuLabel>
        <DropdownMenuItem>
          <Users className="mr-2 size-4" />
          <span>Invite users</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="mr-2 size-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Open menu and verify labels", async () => {
      const trigger = canvasElement.querySelector(
        '[data-slot="dropdown-menu-trigger"]',
      );
      await userEvent.click(trigger!);

      await waitFor(() => {
        // Content is in a portal
        expect(document.body.textContent).toContain("My Account");
        expect(document.body.textContent).toContain("Team");
      });
    });
  },
};

export const WithCheckboxes: Story = {
  render: () => {
    const [showStatusBar, setShowStatusBar] = React.useState(true);
    const [showActivityBar, setShowActivityBar] = React.useState(false);
    const [showPanel, setShowPanel] = React.useState(false);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">View Options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  play: async ({ canvasElement, step }) => {
    await step("Open menu and verify checkbox items", async () => {
      const trigger = canvasElement.querySelector(
        '[data-slot="dropdown-menu-trigger"]',
      );
      await userEvent.click(trigger!);

      await waitFor(() => {
        // Content is in a portal
        expect(document.body.textContent).toContain("Status Bar");
        expect(document.body.textContent).toContain("Activity Bar");
      });
    });

    await step("Toggle checkbox item", async () => {
      const checkboxItems = document.querySelectorAll(
        '[data-slot="dropdown-menu-checkbox-item"]',
      );
      await userEvent.click(checkboxItems[1] as Element);

      await waitFor(() => {
        expect(checkboxItems[1]).toHaveAttribute("data-state", "checked");
      });
    });
  },
};

export const WithRadioGroup: Story = {
  render: () => {
    const [position, setPosition] = React.useState("bottom");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Panel Position</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Panel</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">
              Bottom
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  play: async ({ canvasElement, step }) => {
    await step("Open menu and verify radio items", async () => {
      const trigger = canvasElement.querySelector(
        '[data-slot="dropdown-menu-trigger"]',
      );
      await userEvent.click(trigger!);

      await waitFor(() => {
        // Content is in a portal
        expect(document.body.textContent).toContain("Top");
        expect(document.body.textContent).toContain("Bottom");
      });
    });

    await step("Select radio item", async () => {
      const radioItems = document.querySelectorAll(
        '[data-slot="dropdown-menu-radio-item"]',
      );
      await userEvent.click(radioItems[2] as Element);

      await waitFor(() => {
        expect(radioItems[2]).toHaveAttribute("data-state", "checked");
      });
    });
  },
};

export const WithShortcuts: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Keyboard className="mr-2 size-4" />
          Commands
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <Mail className="mr-2 size-4" />
          <span>Email</span>
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageSquare className="mr-2 size-4" />
          <span>Message</span>
          <DropdownMenuShortcut>⌘M</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PlusCircle className="mr-2 size-4" />
          <span>New</span>
          <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Open menu and verify shortcuts", async () => {
      const trigger = canvasElement.querySelector(
        '[data-slot="dropdown-menu-trigger"]',
      );
      await userEvent.click(trigger!);

      await waitFor(() => {
        // Content is in a portal
        expect(document.body.textContent).toContain("⌘E");
        expect(document.body.textContent).toContain("⌘M");
      });
    });
  },
};

export const WithSubMenus: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">More Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <User className="mr-2 size-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Users className="mr-2 size-4" />
            <span>Invite users</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <Mail className="mr-2 size-4" />
              <span>Email</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="mr-2 size-4" />
              <span>Message</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PlusCircle className="mr-2 size-4" />
              <span>More...</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 size-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Open menu and verify sub-menu trigger", async () => {
      const trigger = canvasElement.querySelector(
        '[data-slot="dropdown-menu-trigger"]',
      );
      await userEvent.click(trigger!);

      await waitFor(() => {
        // Content is in a portal
        expect(document.body.textContent).toContain("Invite users");
      });
    });
  },
};

export const ProfileMenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-10 rounded-full">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="size-5" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 size-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 size-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github className="mr-2 size-4" />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 size-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 size-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="mr-2 size-4" />
          <span>Logout</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Open profile menu", async () => {
      const trigger = canvasElement.querySelector(
        '[data-slot="dropdown-menu-trigger"]',
      );
      await userEvent.click(trigger!);

      await waitFor(() => {
        // Content is in a portal
        expect(document.body.textContent).toContain("John Doe");
        expect(document.body.textContent).toContain("john@example.com");
      });
    });

    await step("Verify destructive logout item", async () => {
      const items = document.querySelectorAll(
        '[data-slot="dropdown-menu-item"]',
      );
      const logoutItem = Array.from(items).find((item) =>
        item.textContent?.includes("Logout"),
      );
      expect(logoutItem).toHaveAttribute("data-variant", "destructive");
    });
  },
};

export const DestructiveActions: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          Delete permanently
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement, step }) => {
    await step("Open menu and verify destructive items", async () => {
      const trigger = canvasElement.querySelector(
        '[data-slot="dropdown-menu-trigger"]',
      );
      await userEvent.click(trigger!);

      await waitFor(() => {
        // Content is in a portal
        expect(document.body.textContent).toContain("Delete");
        expect(document.body.textContent).toContain("Delete permanently");
      });
    });
  },
};

export const Alignment: Story = {
  render: () => (
    <div className="flex gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Align Start</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>Option 1</DropdownMenuItem>
          <DropdownMenuItem>Option 2</DropdownMenuItem>
          <DropdownMenuItem>Option 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Align Center</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem>Option 1</DropdownMenuItem>
          <DropdownMenuItem>Option 2</DropdownMenuItem>
          <DropdownMenuItem>Option 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Align End</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Option 1</DropdownMenuItem>
          <DropdownMenuItem>Option 2</DropdownMenuItem>
          <DropdownMenuItem>Option 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};
