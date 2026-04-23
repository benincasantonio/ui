# Agent Rules

## Workflow

- Before starting work on a task, first search for an existing GitHub issue for it. If none exists, create one with `gh issue create`.
- After selecting or creating the issue, use `gh issue develop <issue-number> --checkout` to create and checkout the working branch. Do not start implementation until the branch is set up this way.
- Use `bun` as the package manager. Never use `npm`. Run scripts with `bun run`, install packages with `bun add`/`bun add -D`.
- At the end of each task, always propose a commit message using the `type(scope): message` format.
- Before opening a pull request, always evaluate whether the work warrants a version bump in `package.json`.
- Treat the version decision as explicit, not automatic: decide whether the change is patch, minor, major, or does not warrant a bump yet.
- Use semver consistently when making that decision:
  - patch for fixes, low-risk internal improvements, docs-only updates that still need a release, and non-breaking maintenance changes
  - minor for new features, new components, or additive non-breaking public API/styling capabilities
  - major for breaking changes, removals, renamed APIs, changed defaults with migration impact, or styling changes that intentionally break consumer expectations
- If the correct bump level is unclear, stop and ask the user before opening the pull request.
- Ask the user before opening a pull request.

## Code Structure

- Each component file should contain exactly one component. Hooks must go in `src/hooks/` and be exported via `src/hooks/index.ts`. Components live in `src/ui/<ComponentName>/` with one file per component. A barrel file can re-export everything for convenience.

## CSS

- Global styles live in `src/styles/`, with tokens in `src/styles/tokens/`.
- Keep the current Tailwind/shadcn theme variables in `src/index.css` until the migration is complete.
- `src/styles/tokens/colors.css` should only introduce new color variables. Use `light-dark()` there when appropriate, with a dark fallback for unsupported browsers.
- `src/styles/index.css` is the entrypoint for new global token files and is imported by `src/index.css`.
- Components should use shared semantic tokens (`--background`, `--foreground`, `--border`, `--muted-foreground`, `--accent`, etc.) for shared properties.
- Migrated components should expose component-level override variables inside their own CSS files using `@scope(<root-class>)`.
- Never reference another component's variables.
- Read `ARCHITECTURE.md` before making structural CSS changes.

## Git

- Commit message format: `type(scope): message`. Types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`, `ci`. Scope is the component or area affected (e.g. `Alert`, `Notification`, `storybook`).
- Version bumps: bump the version in `package.json` before committing. Use semver — patch for fixes, minor for new features/components, major for breaking changes.
- Tagging and npm publishing are automated: when a PR is merged to `main` and the `package.json` version is new, the `Publish` GitHub Action (`.github/workflows/publish.yml`) creates the git tag and publishes to npm. No manual tagging or publishing needed.
- To create a GitHub release after merge, use the `/release` skill.
