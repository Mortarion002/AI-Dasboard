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
- System Health section showing uptime, routing lanes, worker counts, cache health, and budget usage.
- Request volume chart and recent activity timeline.
- Activity Logs page with expandable rows for prompt, response, tokens, cost, latency, and request metadata.
- Insights page with alert banners, executive summary, model usage, and topic distribution.
- Settings workspace with working panels for Profile, API Keys, Preferences, and Billing.
- Notification sheet opened from the topbar bell button.
- Profile dropdown with direct links to settings panels.
- Command palette with quick actions and keyboard shortcut support.
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
  activity/       Activity table and expanded log rows
  dashboard/      KPI, chart, health, and activity widgets
  insights/       Insight cards, charts, and summaries
  layout/         Sidebar, topbar, and command palette
  settings/       Settings panels and API key table
  shared/         Shared visual primitives
  ui/             shadcn-generated UI components

lib/
  mock-data.ts    Local mock data used by all routes
  utils.ts        Shared utility helpers

store/
  useUIStore.ts   Sidebar and command palette UI state
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Redirects or entry route for the app shell |
| `/dashboard` | Main AIOps overview and system health dashboard |
| `/activity` | Request/activity log table with expandable details |
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

## Mock Data

The dashboard currently uses local mock data from:

```text
lib/mock-data.ts
```

This makes the UI easy to run without a backend. When connecting real services later, `fetchDashboardData()` is the central place to replace with API calls or server-side data access.

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
- Add authentication and role-based access controls.
- Add toast feedback for save actions and key generation.
- Add persistent user profile and billing state.
- Add real filtering and pagination on Activity Logs.
- Add chart SSR guards if the Recharts build warnings need to be silenced.
