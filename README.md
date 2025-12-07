# Audit Servis

Aplikasi manajemen servis untuk UMKM (Usaha Mikro Kecil Menengah) yang memudahkan dalam menangani laporan servis perangkat pelanggan. Aplikasi ini menyediakan alur kerja lengkap mulai dari pendaftaran pelanggan, diagnosis kerusakan, hingga pembuatan laporan servis.

## Fitur Utama

### 1. Manajemen Pelanggan

- Pendaftaran dan autentikasi pengguna
- Penyimpanan data pelanggan
- Riwayat servis perangkat

### 2. Diagnosis Kerusakan

- Formulir pemeriksaan perangkat
- Identifikasi masalah dengan level prioritas
- Rekomendasi perbaikan
- Upload gambar pendukung

### 3. Manajemen Servis

- Pelacakan status perbaikan
- Perhitungan biaya otomatis
- Ekspor laporan ke PDF
- Riwayat servis

### 4. Antarmuka Pengguna

- Tampilan responsif dengan Tailwind CSS
- Navigasi berbasis langkah (stepper)
- Preview laporan interaktif

### 5. Saran AI (Oleh Kolosal AI)

- Saran AI muncul ketika setelah menulis keluhan, setiap menambahkan ke list kerusakan dan tindakan 

### 6. Panduan Pengguna

- Halaman panduan pengguna tersendiri dalam `/docs`

## Teknologi yang Digunakan

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: PrimeReact
- **State Management**: React Hooks
- **PDF Generation**: react-to-pdf

### Backend

- **Runtime**: Node.js
- **Authentication**: Firebase Authentication
- **Database**: Firestore
- **File Storage**: Cloudinary
- **AI**: Kolosal.ai
- **Deployment**: Vercel

## Struktur Proyek

```
.
├── app/                    # Halaman aplikasi (App Router)
│   ├── app/                # Halaman utama
│   ├── history/            # Riwayat servis
│   ├── docs/               # Panduan Pengguna
│   └── profile/            # Manajemen profil
├── backend/                # Logika server
│   ├── controller/         # Controller untuk API
│   └── config/             # Konfigurasi API pihak ketiga
├── components/             # Komponen frontend
│   ├── ui/                 # UI
│   |   ├── forms/          # Komponen formulir
│   |   ├── layouts/        # Kumpulan komponen kecil
│   |   ├── fileParts/      # Bagian file hasil
│   |   ├── sections/       # Komponen bagian landing page
│   |   └── steps/          # Komponen langkah
│   └── logic/              # Logika bisnis
├── public/                 # Aset statis
├── types/                  # Tipe Data TypeScript
└── utils/                  # Reusable functions
```

## Panduan Instalasi

### Prasyarat

- Node.js (v18+)
- npm (v9+)
- Akun Firebase
- Akun Cloudinary

### Langkah-langkah

1. **Clone Repository**

   ```bash
   git clone https://github.com/rizalalfadlil/audit-servis.git
   cd audit-servis
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Buat file `.env.local` di root direktori dan isi dengan konfigurasi:

   ```env
   # Firebase Configuration
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_auth_domain
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Kolosal AI Configuration
   KOLOSAL_API_KEY=your_api_key
   ```

4. **Jalankan Aplikasi**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Tampilan Aplikasi

`/`
![hero](/screenshots/hero.png)

`/app`
![step1](/screenshots/step1.png)
![step2](/screenshots/step2.png)
![step3](/screenshots/step3.png)

`profile/`
![profile](/screenshots/profile.png)

`history/`
![history](/screenshots/history.png)

`docs/`
![docs](/screenshots/docs.png)

## Panduan Penggunaan

panduan lengkap penggunaan bisa dilihat di [panduan pengguna](/USER_GUIDE.md)

## Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detailnya.

## Kontributor

- [RizalAlfadlil](https://github.com/rizalalfadlil)
- [MaseruKun](https://github.com/maserukun)

---

Dibuat dengan ❤️ untuk UMKM Indonesia
