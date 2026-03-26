# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Layout

pnpm monorepo managed with Turbo:

```
apps/frontend/   React 19 + Vite 8 + TypeScript SPA
apps/backend/    NestJS 11 API server
packages/shared/ Shared TypeScript types (no runtime deps)
```

## Commands

Run from repo root (Turbo orchestrates all packages):

```bash
pnpm dev           # Start all dev servers concurrently
pnpm build         # Build all packages in dependency order (shared first)
pnpm lint          # Lint all packages
pnpm format        # Prettier write (all packages)
pnpm format:check  # Prettier check without writing
```

Per-package commands and architecture details are in each app's own `CLAUDE.md`.

No test runner is configured yet.

## After Every Code Change

After completing any coding task, always run in order without asking:

```bash
pnpm format   # Prettier (tabWidth: 2, printWidth: 120)
pnpm lint     # ESLint
```

Fix any lint errors before finishing. Prettier is non-negotiable — all committed code must be formatted.

## Architecture

**Smart Farm Automation Dashboard** — Korean-language SPA for greenhouse monitoring and control.

### Monorepo Structure

- `apps/frontend/` — React SPA (see [apps/frontend/CLAUDE.md](apps/frontend/CLAUDE.md))
- `apps/backend/` — NestJS API server (see [apps/backend/CLAUDE.md](apps/backend/CLAUDE.md))
- `packages/shared/` — Shared TypeScript types imported as `@repo/shared` by both apps. Exports `ApiResponse<T>`, `PaginatedResponse<T>`, domain models (`SensorReading`, `Zone`, `Alert`), and `HealthCheckDto`. No runtime dependencies.

Turbo ensures `packages/shared` is built before dependent apps.

### Docker

`docker-compose.yml` runs `frontend` (port 80, nginx) and `backend` (port 3000). Nginx proxies `/api/` to `backend:3000` and serves the SPA for all other paths. Multi-stage Dockerfiles use `node:20-alpine` + pnpm + Turbo.
