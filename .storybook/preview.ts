import { DocsContainer } from "@storybook/addon-docs/blocks";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import { createElement } from "react";
import { themes } from "storybook/theming";
import "./storybook.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    chromatic: {
      modes: {
        light: { theme: "light" },
        dark: { theme: "dark" },
      },
    },

    docs: {
      container: ({
        context,
        children,
      }: {
        context: Parameters<typeof DocsContainer>[0]["context"];
        children: React.ReactNode;
      }) => {
        const story = context.storyById();
        const { globals } = context.getStoryContext(story);
        const isDark = globals.theme === "dark";
        return createElement(
          DocsContainer,
          { context, theme: isDark ? themes.dark : themes.light },
          children
        );
      },
    },
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
