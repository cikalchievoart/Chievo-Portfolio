# Swiss Design System — Modern Gaming Portfolio

Desain sistem portofolio Cikal Chievo Arment memadukan **Swiss Design (International Typographic Style)** dengan **Modern Gaming Aesthetics**.

---

## 1. Konsep Utama & Filosofi

- **Swiss Design**: Grid asimetris ketat, hirarki tipografi tegas, pola ruang bersih (whitespace), kontras tinggi, keterbacaan maksimal.
- **Gaming Infusion**: Aksen UI HUD (Heads-Up Display), sudut geometris presisi, efek glow halus, status telemetri/indikator live, kontras warna neon ganda.

---

## 2. Palette Warna

| Elemen | Warna / Hex | Deskripsi |
|---|---|---|
| **Background Dark** | `#090D16` | Dark navy ultra-deep untuk kontras Swiss tinggi |
| **Surface Secondary** | `#131C2E` | Container & card background |
| **Swiss Accent 1** | `#FF3366` | Swiss Neon Pink/Red (CTA, highlight utama) |
| **Swiss Accent 2** | `#11F3D3` | Cyber Teal (Gaming accents, status live) |
| **Text Primary** | `#F8FAFC` | Off-white (Keterbacaan tinggi) |
| **Text Muted** | `#94A3B8` | Neutral Slate (Sub-label & deskripsi) |
| **Grid Lines & Borders** | `rgba(255, 255, 255, 0.08)` | Garis struktur grid khas Swiss |

---

## 3. Tipografi & Grid Layout

- **Font Primary**: `Inter` / `Outfit` (Sans-serif modern, rasio x-height tinggi).
- **Font Mono (Gaming HUD)**: `Fira Code` / `JetBrains Mono` (Telemetri, tag, status code, OTP).
- **Grid System**: 12-column asymmetric grid untuk desktop, 1-column responsive grid untuk mobile.
- **Spasi Layout**: Rasio modular (8px, 16px, 24px, 48px, 96px).

---

## 4. Spesifikasi Komponen UI

### 4.1 Header & Status Bar
- Layout grid asimetris dengan logo bertema HUD `[STATUS: ONLINE]`.
- Menu navigasi dengan underline Swiss animasi presisi.

### 4.2 Hero Section
- Tipografi judul ekstra besar: **"GAME PROGRAMMER & MULTIMEDIA ENGINEER"**.
- Counter statistik game/proyek (e.g. `10+ Projects`, `Unity VR`, `Embedded IoT`).
- Frame foto profil dengan aksen corner bracket khas HUD game.

### 4.3 Projects Section
- Layout card tipe Swiss Magazine / Grid modular.
- Badge kategori dengan gaya tag terminal (`[VR/UNITY]`, `[SIMULATION]`, `[WEB]`).
- Slider gambar presisi + modal dokumentasi video/iframe.

### 4.4 Exhibition Gallery
- Showcase slider rasio 16:9 dengan caption tipografi Swiss tebal.
- Fullscreen preview modal dengan petunjuk tombol navigasi HUD.

### 4.5 Skills Matrix
- Dikelompokkan dalam 3 Pilar Utama:
  1. **Game Development & VR** (Unity, C#, Oculus, 3D)
  2. **IT Infrastructure & IoT** (Hardware, Networking, ESP32, Admin)
  3. **Multimedia & UI/UX** (Premiere Pro, Figma, Videography)
- Format kartu grid minimalis dengan rasio aspek konsisten.

### 4.6 Contact Form (2-Step OTP)
- Layout form 2 kolom asimetris: Kolom kiri informasi kontak, kolom kanan form.
- Tampilan verifikasi OTP bergaya enkripsi digital.

---

## 5. Rencana Implementasi Frontend

1. **Globals & Theme**: Update `app/globals.css` dengan token warna Swiss + utility classes.
2. **Refactor Components**: Terapkan Swiss Layout di `Header`, `Hero`, `Projects`, `Gallery`, `Skills`, `Contact`, `Footer`.
3. **Build & Verify**: Uji kompilasi `npm run build` dan visual responsif.
