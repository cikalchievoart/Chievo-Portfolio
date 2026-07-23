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
│   │       └── route.js       # OTP Email contact endpoint
│   ├── globals.css            # Tailwind CSS & global styles
│   ├── layout.js               # Root HTML layout with Google Fonts & FontAwesome
│   └── page.js                 # Landing page rendering React components
├── components/
│   ├── Contact.jsx             # Contact form with OTP verification flow
│   ├── Footer.jsx              # Footer & social links
│   ├── Gallery.jsx             # Exhibition gallery slider
│   ├── Header.jsx              # Sticky navbar & mobile drawer
│   ├── Hero.jsx                # Hero section & particle canvas
│   ├── ImageModal.jsx          # Fullscreen image viewer modal
│   ├── Projects.jsx            # Project cards & video documentation modal
│   └── Skills.jsx              # Technical skill badges
├── data/
│   └── portfolioData.js        # Centralized data store for projects, gallery & skills
├── public/
│   └── images/                 # Portfolio & project image assets
├── AGENTS.md                   # Agent instructions & architecture
├── feature_list.json           # Feature state tracking
├── init.sh                     # Verification script
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies & scripts
└── progress.md                 # Progress tracking
```

## Definition of Done
1. Zero legacy HTML/script files in `app/` or `public/`.
2. All UI components use React state and hooks (no direct DOM mutation).
3. `npm run build` completes clean with zero errors.
