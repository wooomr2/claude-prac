# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this directory.

## Commands

```bash
pnpm dev           # nest start --watch (watch mode)
pnpm build         # nest build → dist/
pnpm start         # node dist/main (production)
pnpm lint          # ESLint
pnpm format        # Prettier write (src/**/*.ts)
pnpm format:check  # Prettier check without writing
```

## After Every Code Change

Always run in order without asking:

```bash
pnpm format
pnpm lint
```

## Architecture

**Stack:** NestJS 11, TypeScript strict, Node 20.

### Entry

`src/main.ts` bootstraps the app with global prefix `/api` and listens on `process.env.PORT` (default 3000).

### Modules

| Module | Path | Description |
|--------|------|-------------|
| `AppModule` | `src/app.module.ts` | Root module |
| `HealthModule` | `src/health/` | `GET /api/health` — returns `HealthCheckDto` |

No domain endpoints exist yet — ready for sensor/zone/alert APIs using `@repo/shared` domain types.

### Shared Types

Import from `@repo/shared` (workspace package at `packages/shared/`):
- `ApiResponse<T>`, `PaginatedResponse<T>` — response envelopes
- `SensorReading`, `Zone`, `Alert`, `SensorType`, `AlertSeverity` — domain models
- `HealthCheckDto`

## TypeScript Notes

`tsconfig.build.json` uses strict mode and excludes `test/` and `node_modules/`. The NestJS CLI uses `tsconfig.build.json` for `nest build`.
