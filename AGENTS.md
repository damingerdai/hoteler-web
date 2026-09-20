# AGENTS.md

## Overview

Angular 22 frontend (standalone components) for the hoteler hotel-management system, plus a Tauri v1 desktop wrapper in `src-tauri/`. Default branch: `master`.

## Setup

- Node >= 24 required (`.nvmrc`: 24.19.0, `engine-strict=true`). `.npmrc` sets `legacy-peer-deps=true` — use npm, not yarn/pnpm.
- Dev proxy: `src/proxy.conf.js` reads `BACKEND_URL` from `.env` (default `http://localhost:8443`). Note: the committed `.env` misspells it as `BACKEND_UR`, so the localhost default is what's actually active — set `BACKEND_URL` to point elsewhere.
- `npm run start:online` references `src/proxy.conf.online.json`, which does not exist — this script is currently broken.

## Commands

- `npm start` — dev server with HMR; proxies `/api` to the backend
- `npm run build -- --configuration production` — production build. CI runs `lint` then this; unit tests are NOT run in CI.
- `npm test` — Karma/Jasmine in watch mode, opens real Chrome (requires a local Chrome)
- `npm run test:ci` — ChromeHeadless, single run, code coverage
- Single spec: `npx ng test --include=path/to/file.spec.ts --watch=false`
- `npm run lint` — ESLint (`src/**/*.ts` + template HTML) then stylelint (`src/**/*.scss`); `npm run lint:scss:fix` autofixes SCSS
- `npm run e2e` — Cypress via @cypress/schematic; starts its own dev server
- `npm run cypress:open` / `cypress:run` — plain Cypress against `http://localhost:4200`; requires `npm start` running first
- `npm run tauri dev` / `tauri build` — desktop app (chained to `npm start` / `npm run build` via `tauri.conf.json`)

## Git hooks (husky)

- pre-commit: lint-staged — ESLint staged `.ts`, `stylelint --fix` staged `.scss`, Prettier on html/md/json/yml/js/css
- pre-push: full `ng lint hoteler-web`
- commit-msg: commitlint conventional types only (`feat fix docs style refactor perf test build ci chore revert`), header <= 200 chars

## Architecture

- Single app project `hoteler-web`; entrypoints `src/main.ts` + `src/app/app.config.ts`; top-level routes in `src/app/app.route.ts`.
- Features live in `src/app/routes/<feature>/` (dashboard, room, customer, user, settings, orders — guarded by `canActivateFn` from `core/guards`; login/register/403/401/404 public), each rendered inside one of two layouts (`src/app/layout/admin-layout|common-layout`). Feature routes are lazy-loaded per folder.
- `src/app/core/` holds cross-cutting code: `api/api.service.ts` (typed HttpClient wrapper), `services/*` (one folder per domain), `interceptors` (auth token), `guards`, `initializers`.
- All HTTP calls use relative URLs (`/api/v1/...`) — there is no API base URL in code. `/api` is wired at the edge per deployment:
    - dev: `src/proxy.conf.js` + `.env` `BACKEND_URL`
    - Docker: `_nginx/default.template` + `scripts/run.sh` render an nginx proxy from the runtime `BACKEND_URL` env var
    - Vercel: edge function `api/proxy.ts` + rewrite in `vercel.json`
- `src/environments/environment.ts` is swapped for `environment.prod.ts` in production builds (fileReplacements in `angular.json`).
- Build output is `dist/hoteler/browser` (application builder) — this is what Docker and Tauri consume.

## Conventions & gotchas

- Prettier: 4-space indent, single quotes, semicolons, es5 trailing commas.
- Schematics generate flat standalone components (`flat: true`): files sit directly in the feature folder as `name.component.{ts,html,scss,spec.ts}`; selector prefix `app` (`test` and empty prefix also allowed in specs and `src/app/shared/`).
- TypeScript is NOT strict (`strict: false`, `strictNullChecks: false`) — don't introduce strict-only idioms or assume null checks are enforced.
- Tailwind 3 is available alongside Angular Material. SCSS include paths contain `node_modules`, `src`, `src/styles` — styles imports don't need relative `../` paths.
- Component style budget: 6 kB warning / 10 kB error (angular.json) — keep component SCSS lean.
- Pushing to `master` builds a Docker image and rolls the k3s deployment via CI; `v*` tags trigger the publish workflow. Releases: `npm run version:patch` / `version:minor`.
