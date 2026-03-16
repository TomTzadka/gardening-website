# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

No test runner is configured.

## Architecture

Single-page React 18 + Vite 4 app. All content is data-driven via JSON — no content is hardcoded in components (except the business name in `Navbar`).

### Language & direction

`App.jsx` holds `lang` state (`'he'` default). On toggle it switches `document.body.className` between `'rtl'` and `'ltr'`. Every component receives `lang` and `data` props — `data` is the full section slice from either `src/data/he.json` or `src/data/en.json`. RTL-specific CSS rules use the `.rtl` body class selector.

### Data files

- `src/data/he.json` / `src/data/en.json` — all UI strings, structured by section (`nav`, `hero`, `about`, `services`, `process`, `gallery`, `testimonials`, `contact`, `footer`, `dictionary`)
- `src/data/plants.json` — 100 plants, each with: `id`, `name_he`, `name_en`, `category`, `sun`, `watering`, `location`, `edible`, `hydroponic`, `difficulty`, `height_cm`, `notes`

### Gallery images

Stored under `public/images/`. Root-level images (e.g. `gallery-3.png`) and project subfolders (e.g. `project_01/`). Each gallery item in the JSON has a `folder` field (empty string for root) and an `image` field. Items with a `projectImages` array open a lightbox. Image paths are built with `encodeURIComponent` to handle filenames with spaces.

### Contact form (EmailJS)

Uses `@emailjs/browser` `send()` (not `sendForm()`). Credentials come from `.env`:
```
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```
Phone number is prepended to the message body string before sending, since the EmailJS template doesn't have a dedicated phone field.

### PlantDictionary filters

Filtering is done client-side with `useMemo` across: `sun` (full/partial/shade), `watering` (low/medium/high), `category` (9 values), `difficulty` (easy/medium/hard), `edible` (boolean), `hydroponic` (boolean), plus free-text search on the active language's name field.

### CSS conventions

Pure CSS with custom properties defined in `src/index.css` (`:root`). No CSS framework. Each component has a co-located `.css` file. Hover/active states and responsive breakpoints are in those files.
