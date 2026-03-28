# Agent Rules

## Workflow

- Before starting work on a new feature or fix, first create a GitHub issue using `gh issue create`, then use `gh issue develop <issue-number> --checkout` to create and checkout the working branch. Do not start implementation until the branch is set up this way.
- Use `bun` as the package manager. Never use `npm`. Run scripts with `bun run`, install packages with `bun add`/`bun add -D`.

## Code Structure

- Each component file should contain exactly one component. Hooks must go in `src/hooks/` and be exported via `src/hooks/index.ts`. Components live in `src/ui/<ComponentName>/` with one file per component. A barrel file can re-export everything for convenience.

## CSS

- Components should use global theme tokens (`--background`, `--foreground`, `--border`, `--muted-foreground`, `--accent`, etc.) for shared properties. Never reference another component's variables (e.g. `--card`, `--card-foreground`, `--input`). Component-specific colors (e.g. `--alert-success`) should be defined in `src/index.css` under `:root` and `.dark` so consumers can override them.

## Git

- Commit message format: `type(scope): message`. Types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`, `ci`. Scope is the component or area affected (e.g. `Alert`, `Notification`, `storybook`).
- Version bumps: bump the version in `package.json` before committing. Use semver — patch for fixes, minor for new features/components, major for breaking changes.
- Tagging and npm publishing are automated: when a PR is merged to `main` and the `package.json` version is new, the `Publish` GitHub Action (`.github/workflows/publish.yml`) creates the git tag and publishes to npm. No manual tagging or publishing needed.
- To create a GitHub release after merge, use the `/release` skill.
