# AIOps Command Dashboard

AIOps Command is a polished AI operations dashboard for monitoring model traffic, API usage, latency, errors, activity logs, insights, account settings, and billing controls. The interface is built as a monochrome black-and-white product UI with shadcn components, Framer Motion transitions, and a working dark/light mode toggle.

## Overview

The app presents a production-style control surface for an AI platform team. It includes a persistent sidebar, top command/search bar, notification drawer, profile menu, dashboard analytics, activity log explorer, system insights, and a multi-panel settings workspace.

Key goals:

- Provide a clean operational dashboard for AI infrastructure metrics.
- Keep the visual system restrained, high-contrast, and black/white-first.
- Use real interface patterns instead of static mockup buttons.
- Make settings, notifications, profile, preferences, and billing navigation functional.
- Keep the code organized around Next.js App Router routes and reusable components.

## Features

- Dashboard overview with KPI cards for requests, token usage, latency, and error rate.
- **KPI cards respond to the date range filter** (Today / Last 7 Days / Last 30 Days / All Time) and update all four metrics live.
- **Hover tooltips on KPI cards** show contextual breakdowns — requests vs prior period, token input/output split, latency p50/p95/p99, and error/timeout counts.
- System Health section showing uptime, routing lanes, worker counts, cache health, and budget usage.
- **System Health cards are clickable** and navigate to relevant pages (Gateway/Workers → Activity, Vector DB → Insights, Budget → Billing).
- Public provider status panel backed by free Statuspage JSON APIs for Vercel, GitHub, OpenAI, and Anthropic.
- Request volume chart and recent activity timeline.
- Activity Logs page with expandable rows for prompt, response, tokens, cost, latency, and request metadata.
- **Activity Logs filters are fully functional** — Status (All / Success / Error / Timeout), Model, and Date filters all filter the table live.
- **Activity Logs pagination** works with Previous/Next buttons and a live "Showing X to Y of Z entries" count.
- **Activity Logs export** downloads the currently filtered results as a CSV file.
- Insights page with alert banners, executive summary, model usage, and topic distribution.
- Settings workspace with working panels for Profile, API Keys, Preferences, and Billing.
- Notification sheet opened from the topbar bell button.
- Profile dropdown with direct links to settings panels.
- **Command palette** with working navigation to all pages, quick actions, and keyboard shortcut support (Ctrl K). Items filter as you type and navigate on click or Enter.
- Dark/light theme toggle powered by `next-themes`.
- Framer Motion animations for navigation, panels, cards, and controls.
- shadcn/ui primitives for consistent accessible UI components.

## Tech Stack

- Next.js `16.2.4`
- React `19.2.4`
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Radix UI primitives through the unified `radix-ui` package
- Framer Motion
- Recharts
- Lucide React icons
- Zustand for small UI state persistence
- next-themes for theme switching
- better-sqlite3 for local SQLite persistence

## Project Structure

```text
app/
  activity/       Activity log route
  dashboard/      Main operations dashboard route
  insights/       System insights route
  settings/       Settings workspace route
  globals.css     Theme tokens and global styles
  layout.tsx      Root app shell

components/
  activity/       Activity table, filters, expanded log rows, and client wrapper
  dashboard/      KPI cards, chart, health grid, activity widgets, and client wrapper
  insights/       Insight cards, charts, and summaries
  layout/         Sidebar, topbar, and command palette
  settings/       Settings panels and API key table
  shared/         Shared visual primitives
  ui/             shadcn-generated UI components

lib/
  db.ts           SQLite connection, schema migration, profile persistence, status snapshots
  mock-data.ts    Local mock data used by all routes (includes per-range KPI snapshots)
  provider-status.ts
                  Public provider status fetching with SQLite fallback
  utils.ts        Shared utility helpers

store/
  useUIStore.ts   Sidebar and command palette UI state
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Redirects or entry route for the app shell |
| `/dashboard` | Main AIOps overview and system health dashboard |
| `/activity` | Request/activity log table with filters, pagination, and export |
| `/insights` | Operational alerts, summaries, and model/topic analytics |
| `/settings` | Settings workspace |
| `/settings?panel=profile` | Profile settings panel |
| `/settings?panel=api-keys` | API key management panel |
| `/settings?panel=preferences` | Runtime preferences and notification defaults |
| `/settings?panel=billing` | Plan, usage, and invoice panel |

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000/dashboard
```

## Available Scripts

```bash
npm run dev
```

Runs the local Next.js development server.

```bash
npm run lint
```

Runs ESLint across the project.

```bash
npm run build
```

Creates an optimized production build.

```bash
npm run start
```

Starts the production server after a successful build.

## Design System

The UI uses a neutral monochrome token system defined in `app/globals.css`.

Core ideas:

- `bg-background`, `bg-surface`, and `bg-surface-dim` define the app layers.
- `text-text-primary` and `text-text-muted` control hierarchy.
- `primary` is black in light mode and off-white in dark mode.
- Cards use restrained borders and small radii for a product-dashboard feel.
- Accent usage is intentionally minimal so status, focus, and data remain readable.

The app defaults to dark mode, while the topbar toggle and profile menu switch allow users to move between dark and light themes.

## Settings Panels

The settings route is driven by the `panel` search parameter. This lets the topbar profile menu deep-link directly into each settings panel.

Examples:

```text
/settings?panel=profile
/settings?panel=api-keys
/settings?panel=preferences
/settings?panel=billing
```

The main implementation lives in:

```text
components/settings/SettingsWorkspace.tsx
```

## Activity Logs

The activity log page is fully interactive:

- **Status filter** — All, Success, Error (non-timeout), Timeout.
- **Model filter** — derived dynamically from the actual log data; selecting a model filters the table to that model only.
- **Date filter** — date picker filters logs to a specific day. An × button clears the selection.
- **Pagination** — 5 entries per page with Previous/Next buttons disabled at boundaries and a live "Showing X to Y of Z entries" counter.
- **Export** — downloads the currently filtered (not all) logs as a CSV with columns: Req ID, Status, Model, Latency, Date, Timestamp, Tokens, Cost, Prompt Snippet.

Filters reset to page 1 automatically when changed. The filter toolbar and pagination logic live in:

```text
components/activity/ActivityLogsClient.tsx
```

## Command Palette

Open with **Ctrl K** or by clicking the search bar in the topbar.

- Type to filter items — all items have explicit `value` props for reliable matching.
- **Navigate group** — Dashboard, Activity Logs, Insights, Settings — all navigate on click or Enter.
- **Quick Actions** — Create API Key, Go to Insights, Open Preferences, Toggle Dark Mode (Ctrl D), Invite Team Member.
- The palette closes automatically when the route changes (via `usePathname` effect).
- Mouse clicks work via `onPointerDown` handlers that fire before `cmdk` can cancel the event chain.

## Mock Data

The dashboard uses local mock data for generated AI activity logs, model usage, demo billing information, and per-range KPI snapshots:

```text
lib/mock-data.ts
```

KPI data is available for four time ranges via the `kpiByRange` export — each snapshot includes the headline metric plus tooltip breakdown fields (change %, p50/p95/p99 latency, input/output token split, error/timeout counts).

Live provider health comes from public Statuspage-compatible JSON APIs:

```text
https://www.vercel-status.com/api/v2/summary.json
https://www.githubstatus.com/api/v2/summary.json
https://status.openai.com/api/v2/summary.json
https://status.anthropic.com/api/v2/summary.json
```

No API key is required for those read-only status endpoints. If the network is unavailable or a provider request fails, the app falls back to the latest provider status snapshots stored in SQLite.

## SQLite Persistence

The app uses a local SQLite database for user-editable profile settings and cached provider-status snapshots.

Default database path:

```text
data/aiops-command.db
```

On Vercel, the app automatically uses:

```text
/tmp/aiops-command.db
```

This avoids read-only filesystem failures in Vercel Functions, but `/tmp` is ephemeral. For production-grade persistence on Vercel, move profile/settings data to a managed database such as Vercel Postgres, Neon, Supabase, Turso/libSQL, or another external database.

You can override it with:

```bash
SQLITE_DB_PATH="C:/path/to/aiops-command.db" npm run dev
```

The SQLite file is intentionally ignored by git:

```text
data/*.db
data/*.db-*
```

Schema migration and seed logic live in:

```text
lib/db.ts
```

The Profile settings form saves through a Next.js Server Action:

```text
app/settings/actions.ts
```

## Verification

Before pushing changes, run:

```bash
npm run lint
npm run build
```

The build may print Recharts SSR size warnings during static generation. The app still builds successfully; these warnings come from responsive chart containers being evaluated during server rendering.

## Deployment

This is a standard Next.js App Router project and can be deployed on Vercel or any compatible Next.js hosting platform.

For Vercel:

```bash
npm run build
```

Then connect the repository in the Vercel dashboard or deploy with the Vercel CLI.

## Future Improvements

- Replace mock data with a real API or database-backed data source.
- Add a real API key CRUD flow backed by SQLite.
- Add authentication and role-based access controls.
- Add toast feedback for save actions and key generation.
- Add persistent billing and preference state.
- Add chart data that responds to the dashboard date range filter.
- Add chart SSR guards if the Recharts build warnings need to be silenced.

## LICENSE

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
