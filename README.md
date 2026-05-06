# IU Canvas — Design System

An editorial design system for the Indiana University Canvas LMS web client.

## What's here

- **Paper file** — the canonical design lives in Paper Desktop (`pap bridge` file). Two artboards:
  - `IU Canvas — Tokens` — palette, type scale, spacing scale.
  - `IU Canvas — Dashboard` — 1440px desktop dashboard, system applied.
- **Code** — React + Tailwind, mirroring the Paper tokens 1:1.
  - `tailwind.config.js` — colors, type scale, spacing, radii.
  - `src/tokens.ts` — same tokens as TS constants for non-Tailwind use.
  - `src/components/` — `Sidebar`, `Topbar`, `CourseCard`, `TodoList`, `Announcement`, `icons`.
  - `src/pages/Dashboard.tsx` — dashboard page composed from the components above.

## Design principles

Editorial / institutional. Pure white ground, IU Crimson reserved for brand and primary action only. Hairline rules over heavy boxes. Strong type hierarchy via Inter weight + tracking contrast.

## Palette

| Token   | Hex     | Role                |
| ------- | ------- | ------------------- |
| crimson | #990000 | brand, primary CTA  |
| ink     | #111111 | primary text        |
| slate   | #5C5C5C | secondary text      |
| rule    | #E5E5E5 | borders, dividers   |
| paper   | #F5F5F2 | quiet surfaces      |
| page    | #FFFFFF | ground              |
| success | #0A6B3B | semantic            |
| warning | #B45309 | semantic            |
| error   | #B00020 | semantic            |
| info    | #0B5FFF | semantic            |

## Type scale (Inter)

`display 56/60 -2%` · `h1 32/40 -1.5%` · `h2 24/32 -1%` · `h3 20/28` · `body 16/24` · `small 14/20` · `caption 12/16 +8%`

## Spacing

4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 (4-based).

## Run

```
npm install
npm run dev
```
