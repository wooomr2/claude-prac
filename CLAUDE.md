# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Start dev server (Vite HMR)
npm run build         # Type-check + production bundle (tsc -b && vite build)
npm run lint          # ESLint
npm run format        # Prettier write (all files)
npm run format:check  # Prettier check without writing
npm run preview       # Serve the dist/ build locally
```

No test runner is configured yet.

## After Every Code Change

After completing any coding task, always run in order:

```bash
npm run format   # Prettier (tabWidth: 2, printWidth: 120)
npm run lint     # ESLint
```

Fix any lint errors before finishing. Prettier is non-negotiable — all committed code must be formatted.

## Architecture

**Smart Farm Automation Dashboard** — Korean-language SPA for greenhouse monitoring and control.

**Stack:** React 19, TypeScript (strict), Vite 8, Tailwind CSS 3, React Router 7, Zustand 5 (installed, not yet wired up).

**Routing:** Single route defined in `src/router/index.tsx`: `/` → `DashboardPage`.

**Dashboard layout** (`src/pages/Dashboard/index.tsx`):

- `Sidebar` + `Header` (TopBar + StatsStrip with live clock) wrap a 3-row main grid
- Row 1: four `SensorCard` components (Temperature, Humidity, CO₂, Light)
- Row 2: `EnvironmentChart` (custom SVG time-series) + `ZoneGrid` (6 crop zones)
- Row 3: `IrrigationPanel` + `AlertFeed`

All dashboard sub-components live in `src/pages/Dashboard/components/`. Mock data is in `data.ts`, TypeScript types in `types.ts`. Sensors update every 2 s via `setInterval` in local `useState`/`useEffect` — no backend.

**Styling:** Dark theme with green (`#22c55e`) accents. Mix of Tailwind utility classes and inline styles. Fonts loaded from Google Fonts (Noto Sans KR, Syne, JetBrains Mono).

**Visualizations:** All charts and gauges are hand-coded SVG — no external chart library.

**Empty scaffolding** (ready to fill): `src/store/`, `src/hooks/`, `src/utils/`, `src/components/ui/`.

## TypeScript Notes

`tsconfig.app.json` has `noUnusedLocals` and `noUnusedParameters` enabled — unused variables will fail the build. Clean up imports before running `npm run build`.
