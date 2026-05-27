# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # TypeScript check + Vite production build (outputs to dist/)
npm run lint      # ESLint checks
npm run preview   # Preview the production build locally
```

## Architecture

**Stack:** React 19 + TypeScript 5, Vite 7, Tailwind CSS v4, GSAP + Lenis (scroll/animation), Framer Motion, Matter.js

**Content:** All portfolio data (skills, projects, experience, contact info) lives in `src/data/portfolio.ts`. This is the single source of truth — update content there, not inside components.

**Component layout:**
- `src/App.tsx` — Root layout; assembles Navbar, all sections (Hero → Contact), SmoothScroll, and GlobalBackground in order
- `src/components/layout/` — App-wide layout: Navbar, GlobalBackground, SmoothScroll (Lenis init + GSAP ScrollTrigger bridge), CustomCursor
- `src/components/sections/` — One file per page section: Hero, Expertise, About, Experience, Skills, Projects, Contact
- `src/components/ui/` — Reusable primitives (e.g., MagneticButton)
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge) for conditional Tailwind classes

**Styling:** Tailwind v4 via `@tailwindcss/vite` (no `tailwind.config.js` needed). Custom design tokens are defined as CSS variables in `src/index.css` under `@theme`. Key tokens:
- `--color-primary`: Electric Violet (`#b8a0ff`)
- `--color-secondary`: Cyan/Nebula (`#60d5ff`)
- `--color-background`: Obsidian (`#0a0c14`)

Custom utility classes `.glass`, `.glass-card`, `.text-gradient` are defined at the bottom of `src/index.css`.

**Scroll animation:** `SmoothScroll` wraps the app with Lenis and syncs it with GSAP's ScrollTrigger via a RAF loop. Any GSAP ScrollTrigger animations in sections depend on this integration being mounted.

**Path alias:** `@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).
