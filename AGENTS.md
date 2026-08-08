# AGENTS.md

## Overview
A modern web application wizard to select cycling apparel kit. Single Page Application (SPA) built with Vanilla HTML/CSS/JS — no framework dependencies.

## Commands
- **Dev server**: `npx serve .` (or `npx vite` if using Vite)

## Project Structure
```
├── index.html          # Entry point
├── src/
│   ├── main.js         # App bootstrap
│   ├── app.js          # Main app logic/router
│   ├── components/     # Reusable UI components
│   │   └── ComponentName/
│   │       ├── ComponentName.js
│   │       ├── ComponentName.css
│   │       └── index.js
│   ├── pages/          # Page-level components
│   │   └── PageName/
│   │       ├── PageName.js
│   │       ├── PageName.css
│   │       └── index.js
│   ├── styles/
│   │   ├── reset.css
│   │   ├── variables.css
│   │   └── global.css
│   ├── utils/          # Helpers, constants, API
│   └── assets/         # Images, fonts, static files
├── public/             # Static assets (favicon, etc.)
├── package.json
└── vite.config.js      # Or other bundler config
```

## Module System
- **ES Modules** — Use `type: "module"` in `package.json`
- **Import maps** (optional) — For bare specifier imports in browser without bundler
- **Bundler** — Vite/esbuild recommended for production builds, HMR, and optimization
- **Import style** — Relative imports (`./utils/api.js`) or path aliases via bundler config

## Styling
Design system defined in `../UIUXDesign/DESIGN.md` (Supremo Athletic Grid):
- **Colors**: Dark mode primary (#98e7b3 mint), deep forest greens, semantic tokens
- **Typography**: Anybody (headlines), Hanken Grotesk (body), JetBrains Mono (data/labels)
- **Spacing**: 4px base unit, 12-col desktop / 4-col mobile grid
- **Border radius**: 4px base (0.25rem), 8px for containers
- **Depth**: Tonal layers (lighter surfaces), subtle mint glows, 1px forest green outlines
- **Components**: Primary buttons (mint fill), progress bars (mint on forest), cards (elevated dark + forest border)

CSS custom properties in `src/styles/variables.css` matching design tokens.

## Styling Implementation Guidelines
- **Vanilla CSS only** — All design templates must be implemented using vanilla CSS with design system variables
- **No utility frameworks** — Remove Tailwind, Bootstrap, or any CSS framework classes from templates
- **No CSS-in-JS** — Do not use styled-components, emotion, or similar libraries
- **Convert templates** — If a design template uses Tailwind or other framework classes, convert them to semantic CSS classes using design tokens from `variables.css`
- **Component-scoped styles** — Each component/page gets its own CSS file imported via `global.css`
- **Design tokens as source of truth** — All colors, spacing, typography, radii reference CSS custom properties

## Deployment
- **Target**: GitHub Pages
- **Build output**: `dist/` (configure in bundler)
- **Base path**: Set `base` in `vite.config.js` to `/repo-name/` for project pages
- **Workflow**: GitHub Actions to build and deploy on push to main

This repository is currently empty. No project structure, build system, or conventions exist yet.

When initializing the project, add relevant guidance here such as:
- Package manager and install command
- Build, test, lint, typecheck commands
- Project structure and entrypoints
- Framework-specific conventions
- CI/CD workflow