# System Requirements Specification (SRS)

## 1. Development Environment Requirements

To run, build, and maintain the codebase locally:

| Category | Minimum Requirement | Recommended Specification |
| :--- | :--- | :--- |
| **Operating System** | Windows 10 / macOS 11 / Linux (Ubuntu 20.04+) | Windows 11 / macOS Sonoma / Linux |
| **Node.js Runtime** | Node.js `v18.18.0` or higher | Node.js `v20.x LTS` |
| **Package Manager** | `npm` v9.x | `npm` v10.x / `pnpm` v9.x |
| **Database Server** | Local PostgreSQL 14+ or Supabase / Docker | Local PostgreSQL 16 or Supabase local CLI |
| **Version Control** | Git 2.30+ | Git latest |
| **IDE / Editor** | VS Code / Antigravity IDE | VS Code + ESLint + Tailwind Extension |

---

## 2. Server & Infrastructure Production Requirements

For hosting the server runtime and database in production (e.g., Vercel + Railway / AWS / VPS):

### Node.js App Server (Serverless / Container)
* **Compute**: 1 vCPU, 512 MB RAM minimum (Recommended: 2 vCPU, 2 GB RAM).
* **Storage**: Serverless execution (Ephemeral) or 10 GB SSD for VPS/Docker container.
* **Bandwidth**: 100 GB/month minimum (scales with visitor traffic).
* **Edge / CDN**: Vercel Edge Network or Cloudflare CDN for static asset delivery.

### PostgreSQL Database Server
* **Engine**: PostgreSQL `v15.0` or `v16.x`.
* **RAM & CPU**: 1 vCPU, 1 GB RAM (e.g., Supabase / Railway database tier).
* **Storage**: 1 GB SSD storage minimum (Auto-expanding).
* **Connections**: Connection pooling (e.g., PgBouncer / Supabase Pooler) supporting minimum 50 concurrent connections.

---

## 3. External Services & APIs

| Service Type | Requirement | Purpose |
| :--- | :--- | :--- |
| **SMTP Mail Server** | Gmail SMTP / Resend API / SendGrid | OTP contact form email delivery |
| **Cloud Storage** | Cloudinary / AWS S3 / Supabase Storage | Dynamic portfolio project & gallery images |
| **DNS & SSL** | Cloudflare / Vercel DNS | Free SSL/TLS certificate (HTTPS compulsory) |

---

## 4. Client / Browser Compatibility

The user-facing portfolio and Admin CMS require modern browser features:

* **Browsers Supported**:
  * Chrome / Chromium (v100+)
  * Mozilla Firefox (v100+)
  * Safari (v15+)
  * Microsoft Edge (v100+)
* **Screen Resolution**: Responsive layout supporting `320px` mobile screens up to `3840px` (4K monitors).
* **Client Features Required**: JavaScript enabled, HTML5 Canvas, WebGL/CSS3 animations, LocalStorage / HTTP Cookies enabled.

---

## 5. Security & Network Requirements

* **Protocol**: HTTPS / TLS 1.3 enforced for all production traffic.
* **CORS Policy**: Restricted to authorized domain origins.
* **Secrets Management**: Environment variables injected via `.env.local` (never committed to repository):
  ```env
  DATABASE_URL=postgresql://user:password@host:5432/dbname
  JWT_SECRET=super-secret-random-32-character-string
  SMTP_HOST=smtp.resend.com
  SMTP_PORT=587
  SMTP_USER=resend
  SMTP_PASS=re_xxxxxxxxx
  NEXT_PUBLIC_APP_URL=https://your-domain.com
  ```
