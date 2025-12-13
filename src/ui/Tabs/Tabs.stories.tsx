import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent, expect, waitFor } from "storybook/test";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../Card/Card";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Label } from "../Label/Label";
import { Settings, User, Lock, Mail, Bell, Shield } from "lucide-react";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  subcomponents: {
    TabsList,
    TabsTrigger,
    TabsContent,
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A set of layered sections of content—known as tab panels—that are displayed one at a time. Built on top of Radix UI Tabs primitives. The Tabs component provides an accessible way to organize and display content in a tabbed interface.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "text",
      description:
        "The value of the tab that should be active when initially rendered.",
    },
    value: {
      control: "text",
      description: "The controlled value of the tab to activate.",
    },
    onValueChange: {
      action: "valueChanged",
      description: "Event handler called when the value changes.",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the component.",
    },
    className: {
      control: "text",
      description: "Custom CSS classes for styling the tabs container.",
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">
          Make changes to your account here. Click save when you're done.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">
          Change your password here. After saving, you'll be logged out.
        </p>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify initial tab is Account", async () => {
      const accountContent = canvas.getByText(
        "Make changes to your account here. Click save when you're done.",
      );
      expect(accountContent).toBeInTheDocument();
    });

    await step("Click Password tab and verify content changes", async () => {
      const passwordTab = canvas.getByRole("tab", { name: /password/i });
      await userEvent.click(passwordTab);

      await waitFor(() => {
        const passwordContent = canvas.getByText(
          "Change your password here. After saving, you'll be logged out.",
        );
        expect(passwordContent).toBeInTheDocument();
      });
    });

    await step(
      "Click Account tab and verify content changes back",
      async () => {
        const accountTab = canvas.getByRole("tab", { name: /account/i });
        await userEvent.click(accountTab);

        await waitFor(() => {
          const accountContent = canvas.getByText(
            "Make changes to your account here. Click save when you're done.",
          );
          expect(accountContent).toBeInTheDocument();
        });
      },
    );
  },
};

export const WithForms: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify Account tab form is visible", async () => {
      const nameInput = canvas.getByLabelText("Name");
      const usernameInput = canvas.getByLabelText("Username");
      expect(nameInput).toBeInTheDocument();
      expect(usernameInput).toBeInTheDocument();
      expect(nameInput).toHaveValue("Pedro Duarte");
      expect(usernameInput).toHaveValue("@peduarte");
    });

    await step("Switch to Password tab", async () => {
      const passwordTab = canvas.getByRole("tab", { name: /password/i });
      await userEvent.click(passwordTab);

      await waitFor(() => {
        const currentPasswordInput = canvas.getByLabelText("Current password");
        expect(currentPasswordInput).toBeInTheDocument();
      });
    });

    await step("Fill in password fields", async () => {
      const currentPasswordInput = canvas.getByLabelText("Current password");
      const newPasswordInput = canvas.getByLabelText("New password");

      await userEvent.type(currentPasswordInput, "oldpass123", { delay: 50 });
      await userEvent.type(newPasswordInput, "newpass456", { delay: 50 });

      expect(currentPasswordInput).toHaveValue("oldpass123");
      expect(newPasswordInput).toHaveValue("newpass456");
    });

    await step("Switch back to Account tab", async () => {
      const accountTab = canvas.getByRole("tab", { name: /account/i });
      await userEvent.click(accountTab);

      await waitFor(() => {
        const nameInput = canvas.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();
      });
    });
  },
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="profile" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="profile">
          <User className="size-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings className="size-4" />
          Settings
        </TabsTrigger>
        <TabsTrigger value="security">
          <Shield className="size-4" />
          Security
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your profile information.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Update your profile details, avatar, and personal information.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Configure your application settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Adjust preferences, notifications, and other application settings.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your security settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Update your password, enable two-factor authentication, and manage
              security options.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify Profile tab is initially active", async () => {
      const profileDescription = canvas.getByText(
        "Manage your profile information.",
      );
      expect(profileDescription).toBeInTheDocument();
    });

    await step("Click Settings tab", async () => {
      const settingsTab = canvas.getByRole("tab", { name: /settings/i });
      await userEvent.click(settingsTab);

      await waitFor(() => {
        const settingsDescription = canvas.getByText(
          "Configure your application settings.",
        );
        expect(settingsDescription).toBeInTheDocument();
      });
    });

    await step("Click Security tab", async () => {
      const securityTab = canvas.getByRole("tab", { name: /security/i });
      await userEvent.click(securityTab);

      await waitFor(() => {
        const securityDescription = canvas.getByText(
          "Manage your security settings.",
        );
        expect(securityDescription).toBeInTheDocument();
      });
    });

    await step("Click Profile tab to return", async () => {
      const profileTab = canvas.getByRole("tab", { name: /profile/i });
      await userEvent.click(profileTab);

      await waitFor(() => {
        const profileDescription = canvas.getByText(
          "Manage your profile information.",
        );
        expect(profileDescription).toBeInTheDocument();
      });
    });
  },
};

export const MultipleTabs: Story = {
  render: () => (
    <Tabs defaultValue="general" className="w-full max-w-2xl">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="size-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="email">
          <Mail className="size-4" />
          Email
        </TabsTrigger>
        <TabsTrigger value="security">
          <Lock className="size-4" />
          Security
        </TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Manage your general account preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Input id="language" defaultValue="English" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" defaultValue="UTC" />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Choose which notifications you want to receive and how.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="email">
        <Card>
          <CardHeader>
            <CardTitle>Email Settings</CardTitle>
            <CardDescription>Manage your email preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="user@example.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your account security settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Update Password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify General tab is initially active", async () => {
      const generalDescription = canvas.getByText(
        "Manage your general account preferences.",
      );
      expect(generalDescription).toBeInTheDocument();
      const languageInput = canvas.getByLabelText("Language");
      expect(languageInput).toHaveValue("English");
    });

    await step("Navigate through all tabs", async () => {
      // Click Notifications tab
      const notificationsTab = canvas.getByRole("tab", {
        name: /notifications/i,
      });
      await userEvent.click(notificationsTab);
      await waitFor(() => {
        const notificationsDescription = canvas.getByText(
          "Configure how you receive notifications.",
        );
        expect(notificationsDescription).toBeInTheDocument();
      });

      // Click Email tab
      const emailTab = canvas.getByRole("tab", { name: /email/i });
      await userEvent.click(emailTab);
      await waitFor(() => {
        const emailDescription = canvas.getByText(
          "Manage your email preferences.",
        );
        expect(emailDescription).toBeInTheDocument();
        const emailInput = canvas.getByLabelText("Email Address");
        expect(emailInput).toHaveValue("user@example.com");
      });

      // Click Security tab
      const securityTab = canvas.getByRole("tab", { name: /security/i });
      await userEvent.click(securityTab);
      await waitFor(() => {
        const securityDescription = canvas.getByText(
          "Manage your account security settings.",
        );
        expect(securityDescription).toBeInTheDocument();
      });

      // Return to General tab
      const generalTab = canvas.getByRole("tab", { name: /general/i });
      await userEvent.click(generalTab);
      await waitFor(() => {
        const generalDescription = canvas.getByText(
          "Manage your general account preferences.",
        );
        expect(generalDescription).toBeInTheDocument();
      });
    });
  },
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="another">Another</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <p className="text-sm text-muted-foreground">This is an active tab.</p>
      </TabsContent>
      <TabsContent value="disabled">
        <p className="text-sm text-muted-foreground">This tab is disabled.</p>
      </TabsContent>
      <TabsContent value="another">
        <p className="text-sm text-muted-foreground">
          This is another active tab.
        </p>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify Active tab is initially visible", async () => {
      const activeContent = canvas.getByText("This is an active tab.");
      expect(activeContent).toBeInTheDocument();
    });

    await step("Verify disabled tab cannot be clicked", async () => {
      const disabledTab = canvas.getByRole("tab", { name: /disabled/i });
      expect(disabledTab).toBeDisabled();

      // Verify disabled tab has pointer-events: none and cannot be interacted with
      expect(disabledTab).toHaveAttribute("disabled");

      // Verify content remains on Active tab (disabled tab cannot be activated)
      const activeContent = canvas.getByText("This is an active tab.");
      expect(activeContent).toBeInTheDocument();

      // Verify the disabled tab content is not visible
      const disabledContent = canvas.queryByText("This tab is disabled.");
      expect(disabledContent).not.toBeInTheDocument();
    });

    await step("Click Another tab", async () => {
      const anotherTab = canvas.getByRole("tab", { name: /another/i });
      await userEvent.click(anotherTab);

      await waitFor(() => {
        const anotherContent = canvas.getByText("This is another active tab.");
        expect(anotherContent).toBeInTheDocument();
      });
    });
  },
};

export const SimpleContent: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="tab1">Tab One</TabsTrigger>
        <TabsTrigger value="tab2">Tab Two</TabsTrigger>
        <TabsTrigger value="tab3">Tab Three</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4">
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-2">Content for Tab One</h3>
          <p className="text-sm text-muted-foreground">
            This is the content displayed when Tab One is selected. You can put
            any content here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2" className="mt-4">
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-2">Content for Tab Two</h3>
          <p className="text-sm text-muted-foreground">
            This is the content displayed when Tab Two is selected. Each tab can
            have different content.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4">
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-2">Content for Tab Three</h3>
          <p className="text-sm text-muted-foreground">
            This is the content displayed when Tab Three is selected. Tabs help
            organize related content.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify Tab One is initially active", async () => {
      const tabOneHeading = canvas.getByRole("heading", {
        name: /content for tab one/i,
      });
      expect(tabOneHeading).toBeInTheDocument();
    });

    await step("Click Tab Two", async () => {
      const tabTwo = canvas.getByRole("tab", { name: /tab two/i });
      await userEvent.click(tabTwo);

      await waitFor(() => {
        const tabTwoHeading = canvas.getByRole("heading", {
          name: /content for tab two/i,
        });
        expect(tabTwoHeading).toBeInTheDocument();
      });
    });

    await step("Click Tab Three", async () => {
      const tabThree = canvas.getByRole("tab", { name: /tab three/i });
      await userEvent.click(tabThree);

      await waitFor(() => {
        const tabThreeHeading = canvas.getByRole("heading", {
          name: /content for tab three/i,
        });
        expect(tabThreeHeading).toBeInTheDocument();
      });
    });

    await step("Return to Tab One", async () => {
      const tabOne = canvas.getByRole("tab", { name: /tab one/i });
      await userEvent.click(tabOne);

      await waitFor(() => {
        const tabOneHeading = canvas.getByRole("heading", {
          name: /content for tab one/i,
        });
        expect(tabOneHeading).toBeInTheDocument();
      });
    });
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("tab1");
    return (
      <div className="space-y-4 w-[400px]">
        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <p className="text-sm text-muted-foreground">
              Current tab: {value}
            </p>
          </TabsContent>
          <TabsContent value="tab2">
            <p className="text-sm text-muted-foreground">
              Current tab: {value}
            </p>
          </TabsContent>
          <TabsContent value="tab3">
            <p className="text-sm text-muted-foreground">
              Current tab: {value}
            </p>
          </TabsContent>
        </Tabs>
        <div className="text-sm text-muted-foreground">
          <p>Controlled value: {value}</p>
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setValue("tab1")}
            >
              Go to Tab 1
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setValue("tab2")}
            >
              Go to Tab 2
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setValue("tab3")}
            >
              Go to Tab 3
            </Button>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify initial state shows Tab 1", async () => {
      const controlledValue = canvas.getByText("Controlled value: tab1");
      expect(controlledValue).toBeInTheDocument();
      const currentTab = canvas.getByText("Current tab: tab1");
      expect(currentTab).toBeInTheDocument();
    });

    await step("Click Tab 2 trigger", async () => {
      const tab2 = canvas.getByRole("tab", { name: /tab 2/i });
      await userEvent.click(tab2);

      await waitFor(() => {
        const controlledValue = canvas.getByText("Controlled value: tab2");
        expect(controlledValue).toBeInTheDocument();
      });
    });

    await step("Use external button to change tab", async () => {
      const goToTab3Button = canvas.getByRole("button", {
        name: /go to tab 3/i,
      });
      await userEvent.click(goToTab3Button);

      await waitFor(() => {
        const controlledValue = canvas.getByText("Controlled value: tab3");
        expect(controlledValue).toBeInTheDocument();
        const currentTab = canvas.getByText("Current tab: tab3");
        expect(currentTab).toBeInTheDocument();
      });
    });

    await step("Use external button to return to Tab 1", async () => {
      const goToTab1Button = canvas.getByRole("button", {
        name: /go to tab 1/i,
      });
      await userEvent.click(goToTab1Button);

      await waitFor(() => {
        const controlledValue = canvas.getByText("Controlled value: tab1");
        expect(controlledValue).toBeInTheDocument();
      });
    });
  },
};
