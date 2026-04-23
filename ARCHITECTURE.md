# CSS Architecture

## Goals

- Migrate from Tailwind-first component styling to component-local CSS incrementally.
- Preserve the current public API and keep backward compatibility during the migration.
- Keep `src/ui/` as the home for components.
- Introduce a dedicated `src/styles/` layer for new tokens and shared styling entrypoints.

## Folder Structure

```text
src/
├── index.css
├── index.ts
├── styles/
│   ├── index.css
│   └── tokens/
│       ├── functions.css
│       └── colors.css
├── lib/
├── hooks/
└── ui/
    └── <Component>/
        ├── <Component>.tsx
        └── <Component>.css
```

## Entry Points

- `src/index.css` remains the source of the current Tailwind/shadcn variables and still feeds the built `ui.css` output.
- `src/styles/index.css` is imported by `src/index.css` and is reserved for new global token files.
- `src/index.ts` continues to import `src/index.css`, so the public stylesheet entrypoint stays stable.

## Theme Model

- Existing theme tokens stay in `src/index.css` during the migration.
- New color tokens are added in `src/styles/tokens/colors.css`.
- New color tokens can use `light-dark()` in supported browsers.
- Unsupported browsers keep the fallback values declared outside `@supports`.
- `.dark` can still drive `color-scheme` for the new token layer where needed.

Example:

```css
:root {
  --color-success: #34d399;
}

@supports (color: light-dark(white, black)) {
  :root {
    color-scheme: light;
    --color-success: light-dark(oklch(0.62 0.19 145), oklch(0.72 0.19 145));
  }

  .light {
    color-scheme: light;
  }

  .dark {
    color-scheme: dark;
  }
}
```

## Tokens

`src/styles/tokens/functions.css` exists as reserved groundwork for future native CSS functions once browser support is good enough. It is intentionally empty in this phase.

### Existing Tokens

The current shadcn/Tailwind-oriented theme variables remain in `src/index.css` for now, including:

- `--background`
- `--foreground`
- `--primary`
- `--primary-foreground`
- `--secondary`
- `--secondary-foreground`
- `--muted`
- `--muted-foreground`
- `--accent`
- `--accent-foreground`
- `--border`
- `--destructive`
- `--ring`
- `--alert-success`
- `--alert-info`
- `--alert-warning`
- `--alert-danger`

These continue to support the Tailwind-based components during the transition.

### New Tokens

`src/styles/tokens/colors.css` is for new color variables only. Start with the smallest set that is actually needed and grow it over time.

Current examples:

- `--color-success`
- `--color-info`
- `--color-warning`
- `--color-danger`

Existing component-specific variables can alias these newer generic color tokens in `src/index.css` to preserve backward compatibility while the migration is in progress.

## Component CSS Rules

- Each component owns its local CSS file inside `src/ui/<Component>/`.
- Shared values should come from semantic tokens.
- Each CSS-based component should expose component-level override variables in its own CSS file.
- Define those variables inside `@scope(<root-class>)` using `:scope`.
- Do not reference another component's variables.

Example:

```css
@scope (.button) {
  :scope {
    --button-background-color: var(--primary);
    --button-text-color: var(--primary-foreground);
  }
}

.button {
  background-color: var(--button-background-color);
  color: var(--button-text-color);
}
```

## Current Scope

Phase 1 covers:

- the new `src/styles/` structure
- the new-token groundwork in `src/styles/tokens/colors.css`
- Button component variables
- Notification component groundwork
- `@scope` variable blocks for all components that already use local CSS

Not in scope for now:

- CSS `@function`
- moving the existing shadcn/Tailwind variables out of `src/index.css`

Tailwind remains in place for components that have not yet been migrated.
