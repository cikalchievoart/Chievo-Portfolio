# DESIGN SYSTEM & UI GUIDELINES

## Overview
Visual identity and frontend design system specification for **Cikal Chievo Arment Portfolio**.
Built on **Next.js 15**, **React 19**, **Tailwind CSS v4**, **next-themes**, and modern interactive UI patterns (Linear/Vercel-inspired Cyber-Editorial).

---

## 1. Aesthetic Direction
- **Theme**: Modern Cyber-Editorial & Interactive Dark/Light UI (Linear / Developer-Terminal Inspired).
- **Tone**: Sleek, high-precision, technical, interactive, refined minimal aesthetics without heavy retro clutter.
- **Key Motifs**:
  - **Double-Bezel (Doppelrand) Containers**: 1px subtle gradient border wrapper with nested high-contrast surface.
  - **Spotlight Cursor Lighting**: Real-time cursor tracking radial glow on cards (`--mouse-x`, `--mouse-y`).
  - **Floating Dynamic Island Navigation**: Pill-shaped blurred nav island with scroll compression and live status.
  - **Interactive Decrypt Typography**: Cyber text scramble/descramble animation with kinetic letter hover physics.
  - **Ambient Particle Matrix**: Lightweight canvas particles with cursor repulsion and theme-aware rendering.
  - **Subtle Mesh Background Grid**: 40px geometric grid with dual-color radial ambient glows (Cyan & Indigo).
  - **Asymmetric Bento Grids**: Varied card spans for featured systems and detailed media showcases.

---

## 2. Color Palette & Dual-Theming

### Brand Tokens (`@theme`)
| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `--color-brand-cyan` | `#00F0FF` | Primary electric cyan accent, particle highlights, active states |
| `--color-brand-indigo` | `#6366F1` | Secondary indigo accent, gradient blends, ambient backdrops |
| `--color-brand-emerald` | `#10B981` | Live availability badges, online status indicators |
| `--color-brand-rose` | `#F43F5E` | Keyword code tokens, alert badges |
| `--color-brand-amber` | `#F59E0B` | Numeric code tokens, warning indicators |

### Theme Surface Matrix
| Token Name | Light Mode (`:root`) | Dark Mode (`.dark`) | Purpose |
| :--- | :--- | :--- | :--- |
| `--bg-base` | `#F8FAFC` (Slate 50) | `#07090E` (Deep Void) | Main document background |
| `--surface-card` | `#FFFFFF` (Pure White) | `#0C1017` (Deep Obsidian) | Primary card containers & modal sheets |
| `--surface-inner` | `#F1F5F9` (Slate 100) | `#07090E` (Void Dark) | Inset panels, filter tracks, sub-boxes |
| `--surface-hover` | `#E2E8F0` (Slate 200) | `#131924` (Elevated Void) | Interactive surface hover states |
| `--text-main` | `#0F172A` (Slate 900) | `#F8FAFC` (Slate 50) | Primary titles and high-contrast text |
| `--text-sub` | `#334155` (Slate 700) | `#CBD5E1` (Slate 300) | Body copy and descriptions |
| `--text-muted` | `#64748B` (Slate 500) | `#94A3B8` (Slate 400) | Metadata, timestamps, captions |
| `--border-subtle` | `rgba(15, 23, 42, 0.08)` | `rgba(255, 255, 255, 0.08)` | Standard component borders |
| `--border-glow` | `rgba(8, 145, 178, 0.3)` | `rgba(0, 240, 255, 0.3)` | Focus & active hover glow boundaries |

---

## 3. Typography Hierarchy

| Role | Font Family | Size / Weight | Usage |
| :--- | :--- | :--- | :--- |
| **Headline / Display** | `Plus Jakarta Sans` | 2.5rem – 3.75rem / 800 ExtraBold | Main hero title, interactive scramble name |
| **Section Headings (H2)** | `Plus Jakarta Sans` | 1.875rem – 2.25rem / 700 Bold | Major section titles with numbering pills |
| **Card Headings (H3)** | `Plus Jakarta Sans` | 1.25rem – 1.5rem / 600 SemiBold | Bento project titles, timeline roles |
| **Technical / Badges** | `JetBrains Mono`, `Fira Code` | 0.75rem – 0.875rem / 500 Medium | Section prefixes, stat counters, tech chips |
| **Body Text** | `Plus Jakarta Sans` | 0.875rem – 1rem / 400–500 Regular | Project descriptions, biography, form fields |

---

## 4. UI Architecture & Component System

### Component Conventions
1. **Dynamic Island Navbar (`Header.tsx`)**:
   - Fixed top floating pill container (`max-w-5xl`).
   - Backdrop blur (`backdrop-blur-xl` to `backdrop-blur-2xl` on scroll).
   - Embedded theme switcher (`light` / `dark` / `system`).
   - Integrated live status dot with location (`Batam, ID`).

2. **Double-Bezel Bento Cards (`.bezel-container` & `.spotlight-card`)**:
   - Outer container: `p-[1px]` with gradient border (`slate-200` to `transparent` in light, `white/10` to `transparent` in dark).
   - Inner container: `rounded-[calc(1.25rem-1px)]` filled with `--surface-card`.
   - Dynamic radial spotlight cursor overlay (`600px circle`).

3. **Interactive Headline (`InteractiveTitle.tsx`)**:
   - Scramble/decrypt animation using character matrix glyphs (`0101XY_▲■§#&%*~+<>/{}`).
   - Individual letter hover bounce with elastic spring physics (`cubic-bezier(0.32, 0.72, 0, 1)`).
   - Animated continuous gradient clip on last name (`Arment`).

4. **Action Buttons (Button-in-Button Pattern)**:
   - Primary CTA: Rounded pill with gradient fill and embedded circular icon chip (`↗`).
   - Micro-interaction: `group-hover:translate-x-0.5 group-hover:-translate-y-0.5` nested translation.

5. **Modals & Lightboxes (`ImageModal.tsx`)**:
   - Fullscreen overlay with dark blur backdrop (`bg-black/90 backdrop-blur-xl`).
   - Keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`).
   - Zoom controls and thumbnail strip navigation.

---

## 5. Motion & Physics
- **Spring Curve**: `--ease-spring: cubic-bezier(0.32, 0.72, 0, 1)`.
- **Canvas Particles**: Responsive density (`(width * height) / 18000`, capped at 55 particles), cursor repulsion radius (120px), dynamic line linking (100px proximity).
- **Subtle Floating**: Keyframe `subtleFloat` (6s ease-in-out infinite translateY(-6px)).
- **Gradient Animation**: Keyframe `gradientX` (5s ease infinite 200% background size).

---

## 6. Layout & Responsiveness
- **Max Content Width**: `1152px` (`max-w-6xl`) with `px-4 sm:px-6`.
- **Breakpoints**:
  - `sm: 640px` — Mobile drawer navigation, stacked stats.
  - `md: 768px` — Desktop floating island nav, 2-column bento grids.
  - `lg: 1024px` — 12-column asymmetric bento layouts (8-col featured + 4-col standard).
- **Touch Targets**: Minimum 44px for touch interactive triggers.
