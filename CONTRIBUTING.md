# Contributing

These rules apply to every pull request and every push to `main`.

## Before you commit

Run the checks from the repository root and make sure they pass:

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm format:check
```

## Commits

- Keep commits atomic. One logical change per commit, and split larger work into several commits.
- Use the form `type: description`, where the description is one brief lowercase sentence and
  there is no commit body.
- Types: `feat`, `fix`, `chore`, `docs`, `style`, `ci`.
- Do not use the `-` symbol in the description. Write "type check", not the hyphenated form.
- Do not add co author trailers or any AI attribution.

Examples:

```
feat: add the glass design system with a glass surface and button
fix: keep the focus ring visible on tinted glass buttons
chore: add changesets for versioning and publishing
```

## Pull requests

- The description is exactly two sentences that together form one brief paragraph.
- The same rules apply as for commits: no `-` symbol and no AI attribution.
- Add a changeset (`pnpm changeset`) when a package under `packages/` changes in a way consumers
  will notice.
