# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this directory.

## Commands

```bash
pnpm dev           # Vite dev server with HMR
pnpm build         # Type-check + production bundle (tsc -b && vite build)
pnpm lint          # ESLint
pnpm format        # Prettier write
pnpm format:check  # Prettier check without writing
pnpm preview       # Serve dist/ locally
```

## After Every Code Change

Always run in order without asking:

```bash
pnpm format   # Prettier (tabWidth: 2, printWidth: 120)
pnpm lint     # ESLint
```

Fix any lint errors before finishing. Prettier is non-negotiable.

## Architecture

**Stack:** React 19, TypeScript strict, Vite 8, Tailwind CSS 3, React Router 7, Zustand 5 (installed, not yet wired up).

### Entry & Providers

`main.tsx` renders:
```
<ThemeProvider>        ← dark/light, persisted to localStorage as 'sf-theme'
  <RouterProvider>     ← React Router v7
```

### Routing

Single route in `src/router/index.tsx`: `/` → `DashboardPage`.

### Dashboard Layout (`src/pages/Dashboard/`)

`index.tsx` composes the full page:
- `Sidebar` (collapsible, 64 px collapsed / 200 px expanded) + `Header` (TopBar + StatsStrip with live clock)
- Row 1: four `SensorCard` components — Temperature, Humidity, CO₂, Light
- Row 2: `EnvironmentChart` (dual-line SVG time-series) + `ZoneGrid` (6 crop zones)
- Row 3: `IrrigationPanel` + `AlertFeed`

All sub-components live in `src/pages/Dashboard/components/`. Mock data in `data.ts`, TypeScript interfaces in `types.ts`. Sensors update every 2 s via `setInterval` in local `useState`/`useEffect` — no live backend yet.

### Styling

`src/index.css` defines CSS custom properties (`--sf-*`) for both themes. `[data-theme="light"]` selector overrides the dark defaults. Components use a mix of Tailwind utility classes and inline styles that reference `--sf-*` variables. Green accent: `#22c55e`. Fonts (Google Fonts, loaded in `index.html`): Noto Sans KR, Syne, JetBrains Mono.

### Visualizations

All charts and gauges are hand-coded SVG — no chart library. `src/utils/svg.ts` exposes `linePath()` and `areaPath()` for generating SVG path strings used in sparklines and the environment chart.

### Empty Scaffolding (ready to fill)

`src/store/`, `src/hooks/`

## TypeScript Notes

`tsconfig.app.json` enables `noUnusedLocals` and `noUnusedParameters` — unused variables fail the build. Clean up imports before running `pnpm build`.
