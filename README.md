# UMKM Service Management System

Aplikasi manajemen layanan untuk UMKM (Usaha Mikro Kecil Menengah) yang memudahkan dalam menangani laporan servis perangkat pelanggan. Aplikasi ini menyediakan alur kerja lengkap mulai dari pendaftaran pelanggan, diagnosis kerusakan, hingga pembuatan laporan servis.

## 🌟 Fitur Utama

### 1. Manajemen Pelanggan

- Pendaftaran dan autentikasi pengguna
- Penyimpanan data pelanggan
- Riwayat layanan perangkat

### 2. Diagnosis Kerusakan

- Formulir pemeriksaan perangkat
- Identifikasi masalah dengan level prioritas
- Rekomendasi perbaikan
- Upload gambar pendukung

### 3. Manajemen Layanan

- Pelacakan status perbaikan
- Perhitungan biaya otomatis
- Ekspor laporan ke PDF
- Riwayat layanan yang terorganisir

### 4. Antarmuka Pengguna

- Tampilan responsif dengan Tailwind CSS
- Navigasi berbasis langkah (stepper)
- Preview laporan interaktif

## 🛠️ Teknologi yang Digunakan

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
- **Deployment**: Vercel/Netlify (compatible)

## 🏗️ Struktur Proyek

```
.
├── app/                    # Halaman aplikasi (App Router)
│   ├── app/                # Halaman utama
│   ├── history/            # Riwayat layanan
│   └── profile/            # Manajemen profil
├── backend/                # Logika server
│   ├── controller/         # Controller untuk API
│   ├── firebase.ts         # Konfigurasi Firebase
│   └── cloudinary.ts       # Konfigurasi Cloudinary
├── components/             # Komponen frontend
│   ├── ui/                 # Komponen halaman
│   |   ├── forms/          # Komponen form
│   |   ├── layouts/        # Komponen tata letak
│   |   ├── sections/       # Komponen bagian
│   |   └── steps/          # Komponen langkah
│   └── logic/              # Logika bisnis
├── public/                 # Aset statis
├── types/                  # Tipe TypeScript
└── utils/                  # Utility functions
```

## 🚀 Panduan Instalasi

### Prasyarat

- Node.js (v18+)
- npm (v9+)
- Akun Firebase
- Akun Cloudinary

### Langkah-langkah

1. **Clone Repository**

   ```bash
   git clone https://github.com/username/hackathon-umkm-servis.git
   cd hackathon-umkm-servis
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Buat file `.env.local` di root direktori dan isi dengan konfigurasi:

   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Cloudinary Configuration
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Jalankan Aplikasi**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📚 Panduan Penggunaan

panduan lengkap penggunaan bisa dilihat di [panduan pengguna](/PANDUAN_PENGGUNA.md)

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detailnya.

## ✨ Kontributor

- [Nama Anda](https://github.com/username)

---

Dibuat dengan ❤️ untuk UMKM Indonesia
