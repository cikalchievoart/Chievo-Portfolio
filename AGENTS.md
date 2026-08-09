# AGENTS.md

## Project Overview
Standard Next.js 15 React Portfolio application for Cikal Chievo Arment.

## Setup & Running
- Node.js >= 18
- Development: `npm run dev`
- Build verification: `npm run build`

## Project Structure
```
Chievo-Portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts       # OTP Email contact endpoint (TypeScript)
│   ├── globals.css            # Tailwind CSS & global styles
│   ├── layout.tsx             # Root HTML layout with Google Fonts & FontAwesome
│   └── page.tsx               # Landing page rendering React components
├── components/
│   ├── Contact.tsx            # Contact form with OTP verification flow
│   ├── Experience.tsx         # Mission timeline & experience cards
│   ├── Footer.tsx             # Footer & social links
│   ├── Gallery.tsx            # Exhibition gallery slider
│   ├── Header.tsx             # Sticky navbar & mobile drawer
│   ├── Hero.tsx               # Hero section & particle canvas
│   ├── ImageModal.tsx         # Fullscreen image viewer modal
│   ├── Projects.tsx           # Project cards & video documentation modal
│   └── Skills.tsx             # Technical skill badges & ability matrix
├── data/
│   └── portfolioData.ts       # Centralized typed data store for projects, gallery & skills
├── types/
│   └── portfolio.ts           # Shared TypeScript interfaces & types
├── public/
│   └── images/                # Portfolio & project image assets
├── AGENTS.md                  # Agent instructions & architecture
├── DESIGN.md                  # Design system & UI specifications
├── feature_list.json          # Feature state tracking
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript configuration
└── progress.md                # Progress tracking
```

## Definition of Done
1. Zero legacy `.js`/`.jsx` files in `app/`, `components/`, or `data/`.
2. All UI components use React TypeScript (`.tsx`) with strict props and hook typings.
3. `npm run build` completes clean with zero errors.

## Default Modes (Always Active on New Sessions / Chats)
- **Language Rule**: Always respond in English, even when user writes in Indonesian.
- **Caveman Mode (Full)**: ON by default. Terse communication, no fluff, no pleasantries, drop filler/articles, keep exact technical accuracy, code, and terms. Always output in English. Turn off only on explicit user request ("stop caveman" / "normal mode").
- **Ponytail Mode (Full)**: ON by default. Simplest working solution, YAGNI, stdlib/native features first, shortest diffs, no unrequested abstractions/scaffolding. Code first, minimal unrequested explanation. Turn off only on explicit user request ("stop ponytail" / "normal mode").
- **Frontend UI Rule**: Use `shadcn/ui` and `21st.dev` for frontend components, motion, and styling.


