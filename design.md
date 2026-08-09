# DESIGN SYSTEM & UI GUIDELINES

## Overview
Visual identity and frontend design system specification for **Cikal Chievo Arment Portfolio**.
Built on **Next.js 15**, **React 19**, **Tailwind CSS v4**, **shadcn/ui**, and **21st.dev** interaction patterns.

---

## 1. Aesthetic Direction
- **Theme**: Cyber-HUD / Swiss Arcade OS / Futuristic Glassmorphism.
- **Tone**: High-tech, immersive, game-developer oriented, crisp geometry, tactile neon feedback.
- **Key Motifs**:
  - CRT scanlines and subtle cyan background grid textures.
  - Angled polygon chamfer cards (`clip-path`).
  - Neon corner HUD brackets (Cyan & Swiss Red accents).
  - Glowing laser borders on hover.
  - Interactive particle canvas and radar animations.

---

## 2. Color Palette & Tokens

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `--color-primary` | `#11F3D3` | Primary neon cyan accent, active links, glow effects, progress fills |
| `--color-swiss-red` | `#FF3366` | Secondary accent, interactive glitches, alert states, XP bars |
| `--color-bg-base` | `#090D16` | Deep void background for body and overlays |
| `--color-surface-1` | `#131C2E` | Card containers, modal backgrounds, dropdowns |
| `--color-surface-2` | `#1A263D` | Hover states, elevated surfaces, inset panels |
| `--color-text-base` | `#F8FAFC` | Main headings and high-contrast body text |
| `--color-text-muted` | `#94A3B8` | Subtitles, metadata, inactive labels |
| `--color-border-hud` | `rgba(17, 243, 211, 0.25)` | Default HUD component borders |

---

## 3. Typography Hierarchy

| Role | Font Family | Size / Weight | Usage |
| :--- | :--- | :--- | :--- |
| **Hero Title** | `Poppins` | 2.5rem - 3.75rem / 700 Bold | Name, main hero banner |
| **Section Headings (H2)** | `Poppins` | 1.875rem - 2.25rem / 700 Bold | Section titles with neon underline |
| **Card Headings (H3)** | `Poppins` | 1.25rem - 1.5rem / 600 SemiBold | Project cards, experience titles |
| **HUD / Meta / Badges** | `Fira Code`, `JetBrains Mono` | 0.75rem - 0.875rem / Mono | Tech stack chips, level indicators, timestamps |
| **Body Text** | `Poppins`, `Inter` | 0.95rem - 1rem / 400 Regular | Project descriptions, biography, form text |

---

## 4. UI Architecture (shadcn/ui + 21st.dev)

### Component Conventions
1. **Buttons (`shadcn/ui` style)**:
   - **Primary HUD**: Cyan border `rgba(17, 243, 211, 0.4)`, dark fill `#131C2E`, neon hover `box-shadow: 0 0 20px rgba(17, 243, 211, 0.4)`.
   - **Accent / Alert**: Swiss Red outline/fill for secondary actions, stop triggers, or glitch effects.
   - **Icon Button**: Square HUD padded button with micro-scaling transition.

2. **Cards (`clip-cyber-card` & `hud-corner`)**:
   - Angled bottom-right corner chamfer: `polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)`.
   - Top-left cyan bracket (`#11F3D3`) and bottom-right red bracket (`#FF3366`).
   - Glassmorphism backdrop blur `backdrop-blur-md` on surface containers.

3. **Modals & Drawers (`shadcn/ui Dialog / Sheet`)**:
   - Backdrop: `#090D16` at 92-95% opacity with `backdrop-filter: blur(8px)`.
   - Modals for YouTube video demos and fullscreen zoomable image lightboxes.
   - Smooth slide-in mobile navigation drawer (`21st.dev` spring transition).

4. **XP & Skill Progress Bars**:
   - Container: Dark inset bar with subtle cyan border.
   - Gradient fill: `#11F3D3` to `#00B894` (Cyan) or `#FF3366` to `#D63031` (Red).
   - Glow filter with 0.8s ease-in-out expansion on viewport entry.

5. **Form Controls & OTP Input**:
   - 6-digit numeric OTP split-box inputs (`shadcn/ui InputOTP`).
   - Monospace glowing active input borders.
   - Real-time client & server validation state styling.

---

## 5. Motion & Micro-Interactions (21st.dev Inspired)
- **Background Particles**: Interactive HTML5 Canvas floating particles reacting to ambient layout.
- **Glitch Text Effect**: Multi-color offset text shadow jitter on critical hover tags (`#FF3366` / `#11F3D3`).
- **Laser Hover Borders**: Smooth transition from 25% opacity cyan border to 80% opacity with ambient cyan bloom.
- **Active Navigation Tracking**: Dynamic bottom border line animation with `#11F3D3` glow synced via `IntersectionObserver`.

---

## 6. Layout & Responsiveness
- **Max Content Width**: `1280px` (`max-w-7xl`).
- **Breakpoints**:
  - `sm: 640px` — Compact HUD cards, stacked gallery previews.
  - `md: 768px` — 2-column project grids, full desktop navigation bar.
  - `lg: 1024px` — 3-column ability matrices and expanded timeline.
- **Touch Targets**: Minimum 44x44px clickable area for all mobile interactive controls.
