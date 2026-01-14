/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({mode}) => {
  const isBuildingLibrary = mode === "library";
  
  console.log(`Building in ${mode} mode. isBuildingLibrary: ${isBuildingLibrary}`);

  const shouldIncludeTailwind = !isBuildingLibrary;
  console.log(`Including Tailwind CSS plugin: ${shouldIncludeTailwind}`);
  return {
    plugins: [
      react(),
      shouldIncludeTailwind && tailwindcss(),
      dts({
        insertTypesEntry: true,
        include: ["src"],
        exclude: [
          "**/*.stories.tsx",
          "**/*.spec.tsx",
          "**/*.test.tsx",
          "**/*.stories.ts",
          "**/main.tsx",
        ],
        tsconfigPath: "./tsconfig.app.json",
        rollupTypes: true,
      }),
    ],
    build: {
      lib: {
        entry: path.resolve(dirname, "src/index.ts"),
        name: "ui",
        fileName: (format) => `index.${format}.js`,
        formats: ["es", "cjs"],
      },
      rollupOptions: {
        external: ["react", "react-dom", "tailwindcss", "lucide-react"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            tailwindcss: "tailwindcss",
            "lucide-react": "LucideReact",
          },
        },
      },
      sourcemap: true,
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(dirname, "src"),
      },
    },
    test: {
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        reportsDirectory: path.join(dirname, "coverage"),
        include: ["src/**/*.{ts,tsx}"],
        exclude: [
          "**/node_modules/**",
          "**/dist/**",
          "**/coverage/**",
          "src/shadcn/**",
          "**/*.stories.tsx",
          "**/*.spec.tsx",
          "**/*.test.tsx",
          "**/*.stories.tsx",
          "**/*.stories.ts",
          "**/**.d.ts",
          "**/main.tsx",
        ],
      },
      projects: [
        {
          test: {
            name: "unit",
            globals: true,
            environment: "jsdom",
            setupFiles: ["./vitest.setup.ts"],
            include: ["src/**/*.spec.{ts,tsx}"],
            alias: {
              "@": path.resolve(dirname, "src"),
            },
          },
        },
        {
          extends: true,
          plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
            storybookTest({
              configDir: path.join(dirname, ".storybook"),

            }),
          ],
          test: {
            name: "storybook",
            browser: {
              enabled: true,
              headless: true,
              provider: "playwright",
              instances: [
                {
                  browser: "chromium",
                },
              ],
            },
            setupFiles: [".storybook/vitest.setup.ts"],
          },
        },
      ],
    },
  };
});
