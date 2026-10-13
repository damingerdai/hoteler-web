# Hoteler Web

A modern hotel management frontend built with Angular 22, Angular Material, Tailwind CSS, and a responsive admin dashboard experience for daily hotel operations.

This project is the frontend for [hoteler](https://github.com/damingerdai/hoteler), designed to help staff manage rooms, customers, orders, users, and operational insights in a clean and efficient workflow.

## Overview

Hoteler Web provides a polished control panel for hotel administration, combining operational data and business workflows in a single interface. From the login screen to the dashboard and dark-theme experience, the app is built to feel clear, fast, and professional for both desktop and browser-based management.

## Highlights

- Modern admin dashboard with occupancy and analytics widgets
- Room status monitoring and management
- Customer profile and record tracking
- User administration and access management
- Order and operational workflow management
- Settings and configuration panels
- Responsive interface with light and dark themes
- Desktop app support via Tauri

## Screenshots

### Login

![Login](screenshots/login.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Dark mode

![Dark Mode](screenshots/dark-mode.png)

## Tech Stack

- Angular 22
- Angular Material
- Tailwind CSS 3
- RxJS and Angular Router
- TypeScript
- Vite-based Vitest for tests
- ESLint + Stylelint
- Tauri for desktop packaging

## Main Features

### Dashboard

The dashboard gives hotel staff a quick snapshot of operational health, including room occupancy trends, occupancy distribution, and visual insights that help with daily planning.

### Room management

Manage room statuses, availability, and related hotel inventory information in a structured administrative view.

### Customer management

Track customer information and relevant operational records in one place to support service workflows and account maintenance.

### User and permissions

Manage staff accounts, access, and role-related tasks through the built-in user administration area.

### Orders and settings

Handle operational tasks and app configuration from dedicated modules designed to keep the management flow organized.

## Project Structure

- `src/app/routes` — feature modules such as dashboard, room, customer, user, orders, and settings
- `src/app/core` — shared services, guards, API layer, and initialization logic
- `src/app/layout` — admin and common application layouts
- `src-tauri` — desktop application wrapper built with Tauri
- `screenshots` — UI screenshots used for documentation and product showcase

## Getting Started

### Prerequisites

- Node.js 24 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the app in development mode

```bash
npm start
```

The app runs locally and proxies API requests through the backend configuration. By default, the local backend endpoint is expected at `http://localhost:8443` unless you override it in your environment.

### Production build

```bash
npm run build -- --configuration production
```

### Run tests

```bash
npm test
```

For a single CI-style run:

```bash
npm run test:ci
```

### Linting

```bash
npm run lint
```

## Environment configuration

The frontend expects the backend API under `/api/v1/...` and uses a proxy configured in `src/proxy.conf.js`.

Create or update your local `.env` file if needed:

```bash
BACKEND_URL=http://localhost:8443
```

This value is used by the dev proxy so the frontend can reach the backend during local development.

## Related Project

- Backend: [hoteler](https://github.com/damingerdai/hoteler)

## License

This project is distributed under the repository's existing licensing terms.
