# @aliveui/workspace

A team workspace dashboard as a reusable feature: overview with charts, projects, a drag and drop
task board, team management, notifications, search and an app shell.

| Entry                      | What it holds                                                                |
| -------------------------- | ---------------------------------------------------------------------------- |
| `@aliveui/workspace`       | Types, Zod schemas, labels, date helpers, pure selectors, seed data          |
| `@aliveui/workspace/local` | `createLocalWorkspaceAdapter`, one document per owner in the browser         |
| `@aliveui/workspace/react` | `WorkspaceProvider` with optimistic actions, selector hooks                  |
| `@aliveui/workspace/glass` | `AppShell`, `OverviewView`, `ProjectsView`, `TasksView`, `TeamView` and more |

The views take callbacks for navigation, so they work with any router. Every edit applies to the
screen straight away, rolls back if the adapter rejects it, and then syncs with the adapter so the
activity feed stays accurate.

## Moving to a real backend

Implement `WorkspaceAdapter` against your API and pass it to `WorkspaceProvider`. Nothing in the
views needs to change.
