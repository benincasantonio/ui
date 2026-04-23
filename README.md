# @antoniobenincasa/ui

[![Storybook](https://img.shields.io/badge/Storybook-Chromatic-ff4785?logo=chromatic&logoColor=white)](https://www.chromatic.com/library?appId=CHROMATIC_APP_ID)

A personal design system library built with React, TypeScript, and shadcn/ui components. This library provides a collection of reusable, accessible UI components styled with Tailwind CSS.

## Features

- 🎨 **shadcn/ui Components** - Built on top of shadcn/ui for beautiful, accessible components
- ⚡ **TypeScript** - Fully typed for better developer experience
- 🎯 **Tailwind CSS v4** - Modern utility-first CSS framework
- 📦 **Tree-shakeable** - Import only what you need
- 🧩 **Modular** - Components can be used independently
- 📚 **Storybook** - Interactive component documentation
- 🧪 **Vitest** - Comprehensive testing setup
- ♿ **Accessible** - Built with accessibility in mind

## Installation

```bash
npm install @antoniobenincasa/ui
```

### Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install react react-dom tailwindcss lucide-react
```

## Usage

### Import Components

```tsx
import { Button, Input } from "@antoniobenincasa/ui";
import "@antoniobenincasa/ui/ui.css";
```

### Example

```tsx
import { Button, Input } from "@antoniobenincasa/ui";
import "@antoniobenincasa/ui/ui.css";

function App() {
  return (
    <div>
      <Input placeholder="Enter your name" />
      <Button variant="default">Click me</Button>
    </div>
  );
}
```

## Available Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from "@antoniobenincasa/ui";

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### Input

A styled input component with built-in focus states and validation support.

```tsx
import { Input } from "@antoniobenincasa/ui";

<Input type="text" placeholder="Enter text" />
<Input type="email" placeholder="Enter email" />
<Input type="password" placeholder="Enter password" />
```

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook
```

### Build

```bash
# Build the library
npm run build
```

The build output will be in the `dist` directory:

- `index.es.js` - ES module format
- `index.cjs.js` - CommonJS format
- `index.d.ts` - TypeScript definitions
- `ui.css` - Stylesheet

### Testing

```bash
# Run all tests
npm test

# Run unit tests with coverage
npm run test:unit

# Run Storybook tests
npm run test:unit:storybook
```

### Linting

```bash
npm run lint
```

### Git hooks

A pre-push hook runs Biome before every push so formatting/lint issues fail locally instead of on CI. The hook lives in `.githooks/pre-push` and is registered automatically the first time you run `bun install` (via the `prepare` script, which sets `core.hooksPath`).

If the hook doesn't activate for some reason:

```bash
git config core.hooksPath .githooks
```

To skip the hook for a single push (use sparingly):

```bash
git push --no-verify
```

## Project Structure

```
src/
├── index.ts          # Main entry point
├── index.css         # Global styles
├── lib/
│   └── utils.ts      # Utility functions
└── ui/
    ├── Button/       # Button component
    ├── Input/        # Input component
    └── index.ts      # Component exports
```

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Component foundation
- **Radix UI** - Accessible primitives
- **Storybook** - Component documentation
- **Vitest** - Testing framework
- **ESLint** - Code linting

## License

This is a personal project. All rights reserved.
