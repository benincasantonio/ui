---
name: release
description: Create a GitHub release with tag from the current package.json version. Use after merging a PR that bumps the version.
disable-model-invocation: true
allowed-tools: Bash(gh *), Bash(git *), Read
---

Create a GitHub release for this project:

1. Read the current version from `package.json`
2. Check if the tag already exists with `git tag -l "v<version>"`
3. If the tag does not exist, create it: `git tag v<version>`
4. Push the tag: `git push origin v<version>`
5. Create the GitHub release with auto-generated notes:
   ```
   gh release create v<version> --generate-notes --title "v<version>"
   ```
6. Output the release URL when done
