# Product Requirements Document (PRD) — Cikal Chievo Arment Portfolio

## 1. Ringkasan Produk
Portofolio web interaktif dan modern berbasis Next.js 15 & React 19 untuk menampilkan keahlian Cikal Chievo Arment sebagai **Unity VR Game Programmer**, **IT Support Technician**, dan **Multimedia Engineer**.

---

## 2. Tujuan & Target Audiens

### Tujuan Produk
- Menampilkan portofolio proyek (VR, Simulator, Web, Mobile, IoT, Video) secara visual dan interaktif.
- Menyediakan saluran komunikasi aman dengan verifikasi OTP email untuk mencegah spam.
- Memberikan impresi profesional dengan pendekatan **Swiss Design + Gaming Theme**.

### Target Audiens
- Recruiter IT / Tech Talent Acquisition.
- Game Studio Leads & Engineering Managers.
- Klien / Mitra Proyek Software & Multimedia.

---

## 3. Fitur Utama & Spesifikasi Fungsional

### 3.1 Navigasi & Header Status
- Header sticky bertema Swiss HUD dengan indikator telemetri `[STATUS: ONLINE]`.
- Smooth scrolling ke section (#home, #projects, #gallery, #skills, #contact).
- Mobile drawer menu responsif.

### 3.2 Hero Section
- Header tipografi Swiss tebal + efek particle canvas di background.
- Statistik pencapaian ringkas (`10+ Projects`, `VR Games`, `Hardware IoT`).
- Frame foto profil dengan aksen corner bracket geometris.

### 3.3 Katalog Proyek (`Projects.jsx`)
- Grid modul proyek dengan slider gambar interaktif.
- Fitur ekspansi deskripsi ("See All" / "See Less").
- Modall popup untuk dokumentasi video (YouTube / Google Drive preview).
- Tag teknologi bertema terminal (`[UNITY]`, `[VR]`, `[ARDUINO]`).

### 3.4 Galeri Pameran (`Gallery.jsx`)
- Slider galeri dokumentasi pameran nasional (INTI Gamecomm & EXPO).
- Integration modal preview foto layar penuh (fullscreen image viewer).

### 3.5 Matriks Keahlian (`Skills.jsx`)
- Pengelompokan 3 pilar utama:
  1. Game Development & VR
  2. IT Infrastructure & IoT
  3. Multimedia & UI/UX
- Badge dengan ikon FontAwesome dan indikator pengalaman.

### 3.6 Form Kontak & Verifikasi OTP (`Contact.jsx`)
- Alur 2 tahap:
  - **Tahap 1**: Pengisian form (Nama, Email, Subjek, Pesan) + Honeypot anti-bot.
  - **Tahap 2**: Masukkan kode OTP 6 digit yang dikirim ke email via `/api/contact`.
- Umpan balik status real-time (loading, sukses, error).

---

## 4. Persyaratan Non-Fungsional (NFR)

- **Desain & Estetika**: Mengikuti spesifikasi [design.md](file:///c:/Users/Cikal%20Chievo%20Arment/Documents/GitHub/Chievo-Portfolio/design.md) (Swiss Design + Gaming Theme).
- **Performa**: Waktu muat halaman < 1.5 detik, prerendering statis Next.js.
- **Responsivitas**: Tampilan optimal di resolusi 320px hingga 4K.
- **Keamanan**: Honeypot spam protection + OTP rate limiting pada API endpoint.
- **Aksesibilitas & SEO**: Semantic HTML5, meta tag lengkap, ARIA label pada tombol interaktif.

---

## 5. Arsitektur Teknis

- **Framework**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS v4, Custom Theme Tokens
- **Ikon & Font**: FontAwesome 6, Google Fonts (Poppins / Inter / JetBrains Mono)
- **Backend API**: Next.js Route Handlers (`app/api/contact/route.js`)
- **Deployment**: Vercel / Node.js Server

---

## 6. Definition of Done (DoD)

1. Semua komponen menggunakan React state & hooks (bebas manipulasi DOM manual).
2. `npm run build` sukses 100% tanpa warning/error.
3. Form kontak OTP teruji dan berfungsi penuh.
