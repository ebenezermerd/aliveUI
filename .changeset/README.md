# Changesets

Every change to a published package under `packages/` needs a changeset, which records which
packages changed and whether the change is a patch, minor or major bump.

```sh
pnpm changeset          # describe a change
pnpm version-packages   # apply pending changesets to versions and changelogs
pnpm release            # build the packages and publish them to npm
```
