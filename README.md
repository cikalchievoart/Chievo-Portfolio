<div align="center">

# 🌐 Cikal Chievo Arment — Personal Portfolio

**Interactive Web Portfolio & Engineering Showcase**  
*Fusing Physical Sensors, VR Game Logic, and Modern Web Systems*

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-OTP_Secured-22c55e?style=for-the-badge&logo=gmail&logoColor=white)](https://nodemailer.com/)

</div>

---

## 📌 Overview

This repository houses the official personal portfolio of **Cikal Chievo Arment** — a Multimedia Engineering Technology graduate, VR Game Programmer, and IT Systems Engineer based in Batam, Indonesia.

Built from the ground up using **Next.js 15 (App Router)**, **React 19**, and **strict TypeScript**, the application combines a **Precision Dark-Tech / Swiss Kinetic** aesthetic with high-performance interactive elements, full accessibility, multi-theme support (Dark/Light/System), and an anti-spam **2-Step OTP email contact terminal**.

---

## ✨ Key Features

- 🛰️ **Floating Dynamic Island Header (`Header.tsx`)**
  - Detached glassmorphic pill navbar with backdrop blur (`backdrop-blur-2xl`).
  - Real-time availability indicator (`● Available for Work · Batam, ID`).
  - Active section scrollspy highlighting and responsive mobile drawer overlay.
  - Interactive theme switcher integrated directly into navigation.

- ⚡ **Tactile Kinetic Hero (`Hero.tsx` & `InteractiveTitle.tsx`)**
  - Cursor-reactive particle network canvas with proximity spring physics.
  - Dynamic rotating titles (`GAME PROGRAMMER`, `IT PROGRAMMER`, `IT OFFICER`, `IT TECHNICIAN`).
  - Double-bezel framed profile portrait with grayscale-to-color transitions.
  - Magnetic "Button-in-Button" CTA leading directly to projects.

- 🗂️ **Asymmetric Bento Project Showcase (`Projects.tsx`)**
  - High-density project catalog with spotlight cursor-hover effects.
  - Interactive image sliders for each project card.
  - Interactive category filter pills (`All`, `VR & Games`, `Hardware & IoT`, `Web & App`, `Multimedia`).
  - High-resolution video documentation modal with embedded preview players.

- 📊 **Dynamic Skills Matrix (`Skills.tsx`)**
  - Comprehensive catalog of 22+ technical abilities from `data/portfolioData.ts`.
  - Categorized into 5 distinct disciplines with live filtering:
    - `All Skills`
    - `Game Dev & XR` (Unity 3D, C#, VR Interaction Toolkit, Blender)
    - `IT & Systems` (LAN/WAN, Windows/Linux Server, Hardware Troubleshooting, MikroTik)
    - `Multimedia & Design` (Adobe Premiere, After Effects, Photoshop, Figma, UI/UX)
    - `Professional & Team` (Problem Solving, Technical Documentation, Team Leadership)

- 🛤️ **Laser-Circuit Mission Timeline (`Experience.tsx`)**
  - Vertical glowing rail tracking milestones, work history, and academic achievements.
  - Chronological badges detailing roles, institutions, locations, and key accomplishments.

- 🖼️ **Public Exhibition Gallery (`Gallery.tsx` & `ImageModal.tsx`)**
  - Showcase for national expos and tech showcases (e.g., INTI Gamecomm, Polibatam Expo).
  - Fullscreen lightbox viewer with thumbnail strip and keyboard navigation (`←`, `→`, `ESC`).

- 🔒 **Secure 2-Step OTP Contact Terminal (`Contact.tsx` & `/api/contact`)**
  - **Honeypot anti-bot protection** silently dropping automated web scrapers.
  - **In-memory IP rate limiting** (max 5 requests per 10-minute window).
  - **2-Step OTP email verification**: Generates a 6-digit one-time passcode with 5-minute expiry and max 3 attempts.
  - Branded, cyber-styled HTML emails sent to both user and admin via Nodemailer.
  - 1-click email address copy button with real-time visual feedback.

- 🌓 **Dual Theme Engine (`ThemeToggle.tsx` & `ThemeProvider.tsx`)**
  - Dark, Light, and System preferences powered by `next-themes`.
  - Zero-flash rendering with persistent theme state in local storage.

---

## 🛠️ Technology Stack

| Category | Technology | Version | Purpose & Key Role |
| :--- | :--- | :--- | :--- |
| **Frontend Core** | [Next.js](https://nextjs.org/) | `15.3.2` | App Router architecture, hybrid rendering, and routing |
| | [React](https://react.dev/) | `19.1.0` | Component-driven UI architecture, custom hooks, and state management |
| | [TypeScript](https://www.typescriptlang.org/) | `5.8.2` | Static typing, interface definitions (`types/portfolio.ts`), type safety |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com/) | `4.3.0` | Utility-first CSS engine with `@tailwindcss/postcss` integration |
| | [next-themes](https://github.com/pacocoursey/next-themes) | `0.4.6` | Persistent Dark / Light / System theme switching without hydration flash |
| | **Typography** | Google Fonts | `JetBrains Mono` (Terminal HUD mono) & `Plus Jakarta Sans` (Sans UI) |
| | **Iconography** | [FontAwesome 6](https://fontawesome.com/) | Standardized iconography across skills matrix, timeline, and footer |
| **Backend & API** | **Next.js Route Handlers** | `15.3.2` | Serverless POST endpoint (`/api/contact`) for secure message processing |
| | [Node.js](https://nodejs.org/) | `>= 18.18` | JavaScript runtime environment |
| **Security & Email** | [Nodemailer](https://nodemailer.com/) | `6.10.1` | Automated SMTP email delivery with Gmail App Password integration |
| | **OTP Engine** | Custom In-Memory | 6-digit one-time passcode verification (5-min TTL, 3 max attempts) |
| | **Rate Limiter** | Custom In-Memory | IP-based request throttling (max 5 requests per 10-minute window) |
| | **Spam Defense** | Native Honeypot | Hidden `website` input field to silently intercept automated bots |
| **Tooling & Build** | [PostCSS](https://postcss.org/) | `8.5.14` | CSS transformation and minification pipeline |
| | [Vercel](https://vercel.com/) / Node | Edge / Node | Production build hosting platform and static asset distribution |

---

## 📁 Folder Hierarchy

```text
Chievo-Portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts         # Secure 2-step OTP email dispatch & rate limiter
│   ├── globals.css              # Tailwind CSS v4 directives, custom design tokens & animations
│   ├── layout.tsx               # Root HTML layout, font imports, SEO metadata & ThemeProvider
│   └── page.tsx                 # Main landing page assembling sections
├── components/
│   ├── Contact.tsx              # Contact section with 2-step OTP modal & rate feedback
│   ├── Experience.tsx           # Work experience & education timeline component
│   ├── Footer.tsx               # Footer with live UTC+7 clock & social links
│   ├── Gallery.tsx              # Exhibition image gallery carousel
│   ├── Header.tsx               # Floating Dynamic Island navbar & mobile drawer
│   ├── Hero.tsx                 # Hero section with profile portrait & particle canvas
│   ├── ImageModal.tsx           # Fullscreen image lightbox modal
│   ├── InteractiveTitle.tsx     # Dynamic rotating title headline animator
│   ├── Projects.tsx             # Asymmetric Bento grid project cards & video modal
│   ├── Skills.tsx               # Dynamic filterable skills matrix
│   ├── ThemeProvider.tsx        # Next-themes wrapper component
│   └── ThemeToggle.tsx          # Dark / Light theme toggle button
├── data/
│   └── portfolioData.ts         # Central typed data store (projects, gallery, skills, timeline)
├── types/
│   └── portfolio.ts             # Strict TypeScript definitions & interfaces
├── public/
│   └── images/                  # Project screenshots, portraits & exhibition photos
├── .env.local                   # Environment variables (ignored in git)
├── AGENTS.md                    # Engineering guidelines & architectural rules for AI agents
├── CHANGELOG.md                 # Keep a Changelog historical modification log
├── design.md                    # Visual design specification & token system
├── next.config.mjs              # Next.js configuration
├── package.json                 # Project dependencies and script declarations
├── postcss.config.mjs           # PostCSS configuration for Tailwind CSS v4
├── PRD.md                       # Product Requirements Document
├── progress.md                  # Project milestones & completed features
├── tsconfig.json                # TypeScript compiler configuration
└── README.md                    # Project documentation (this file)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.18.0` or higher
- **npm** (v9+) or **pnpm** / **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/cikalchievoart/Chievo-Portfolio.git
cd Chievo-Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local  # If template is available, or create manually
```

Add your Gmail SMTP credentials:
```env
EMAIL_USER="your-gmail-address@gmail.com"
EMAIL_PASS="your-16-character-app-password"
```

> [!TIP]
> To generate an `EMAIL_PASS`, visit your Google Account → **Security** → **2-Step Verification** → **App Passwords**, then create a new app password for "Mail".

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Verification

To verify production readiness and TypeScript types:

```bash
# Build the production bundle
npm run build

# Start production server
npm run start
```

---

## 📡 API Reference: `/api/contact`

The portfolio includes a built-in Next.js Route Handler for secure contact form dispatches:

### Endpoints
- **`POST /api/contact`**
  - **Action 1: `send-otp`**
    ```json
    {
      "action": "send-otp",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "subject": "Project Inquiry",
      "message": "Hello, I would like to discuss a project..."
    }
    ```
    *Generates and sends a 6-digit OTP code to the sender's email address.*

  - **Action 2: `verify-otp`**
    ```json
    {
      "action": "verify-otp",
      "email": "johndoe@example.com",
      "otp": "123456"
    }
    ```
    *Validates the OTP code, clears the session, and forwards the full message to `EMAIL_USER`.*

### Security Measures
- **IP Rate Limiting**: Max 5 requests per 10 minutes per client IP address.
- **OTP Expiration**: OTP codes expire after 5 minutes.
- **Max Attempts**: Maximum 3 verification attempts before the OTP is invalidated.
- **Honeypot Anti-Spam**: Hidden `website` form field to intercept bot submissions.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server at `http://localhost:3000` |
| `npm run build` | Compiles optimized production build and checks TypeScript types |
| `npm run start` | Serves production build locally |

---

## 👤 Author

**Cikal Chievo Arment**
- **Role**: Unity VR Game Programmer · IT Support Technician · Multimedia Engineer
- **Location**: Batam, Riau Islands, Indonesia
- **LinkedIn**: [linkedin.com/in/cikal-chievo-arment](https://linkedin.com/in/cikal-chievo-arment)
- **GitHub**: [@cikalchievoart](https://github.com/cikalchievoart)
- **Email**: [cikalchievoarment@gmail.com](mailto:cikalchievoarment@gmail.com)

---

## 📄 License

This project is created and maintained by **Cikal Chievo Arment**. All rights reserved.
