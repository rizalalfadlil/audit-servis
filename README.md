# Audit Servis

Audit Servis adalah Aplikasi Manajemen Servis yang dirancang untuk mengatasi masalah utama UMKM jasa perbaikan HP dan Laptop yaitu Krisis Kepercayaan Pelanggan. Aplikasi ini menyediakan alur kerja yang memaksa transparansi digital dari pendaftaran hingga pelaporan, sekaligus memberikan tools cerdas (Saran AI) untuk meningkatkan efisiensi internal.

### [**Demo Aplikasi**](https://audit-servis.vercel.app/)

## Tujuan Proyek

Proyek ini dibuat sebagai submisi Hackathon **IMPHNEN x KOLOSAL "Inovasi AI: Mendorong Usaha Lokal dengan AI Inklusif"** dengan fokus pada:

- **Inovasi**: Mengubah proses servis konvensional menjadi Audit Digital 3-Tahap dengan integrasi Kolosal AI.

- **Membantu Usaha Lokal**: Menyediakan alat profesional yang memungkinkan UMKM bersaing dengan standar transparansi service center besar.


## Navigasi Cepat

- [Tentang Aplikasi](#audit-servis)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Screenshot Aplikasi](#screenshot-aplikasi)
- [Demo Video](#demo-video)
- [Fitur Utama](#fitur-utama)
- [Struktur Proyek](#struktur-proyek)
- [Panduan Instalasi](#panduan-instalasi)
- [Panduan Pengguna](#panduan-pengguna)
- [Lisensi](#lisensi)
- [Kontributor](#kontributor)



## Screenshot Aplikasi

### `/`
![hero](/public/screenshots/hero.png)

### `/app`
![step1](/public/screenshots/step1.png)
![step2](/public/screenshots/step2.png)
![step3](/public/screenshots/step3.png)

### `profile/`
![profile](/public/screenshots/profile.png)

### `history/`
![history](/public/screenshots/history.png)

### `docs/`
![docs](/public/screenshots/docs.png)

### [**Demo Video**](https://youtu.be/_i_EKiqDvFA)

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

### 5. Saran AI (dengan Kolosal AI)

- Saran AI muncul ketika setelah menulis keluhan, setiap menambahkan ke list kerusakan dan tindakan

### 6. Panduan Pengguna

- Halaman panduan pengguna tersendiri dalam `/docs`

## Teknologi yang Digunakan

### Frontend

- **Framework**: Next.js 16 (App Router)
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
- **AI Integration**: OpenAI SDK (dengan Base URL: Kolosal.ai, Model: Qwen 3 30BA3B)
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

- Node.js
- npm
- Akun Firebase
- Akun Cloudinary
- Akun Kolosal AI

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

3. **Setup Layanan Pihak Ketiga**

   - Setup Firebase
      1. Buat proyek baru di [Firebase Console](https://console.firebase.google.com/u/0/).
      2. Aktifkan layanan [`Firestore`](https://firebase.google.com/docs/firestore/quickstart) dan [`Auth`](https://firebase.google.com/docs/auth/web/start).


   - Cloudinary
      1. buat upload preset baru dengan mode [`unsigned`](https://cloudinary.com/documentation/client_side_uploading#code_explorer_upload_multiple_files_using_a_form_unsigned)
      
   - Kolosal AI
      - masuk dan buat api key baru di [kolosal](https://app.kolosal.ai/api_keys)

   - [dokumentasi Firebase](https://firebase.google.com/docs)
   - [dokumentasi Cloudinary](https://cloudinary.com/documentation/client_side_uploading#code_explorer_upload_multiple_files_using_a_form_unsigned)
   - [dokumentasi Kolosal AI](https://api.kolosal.ai/docs)
3. **Setup Environment Variables**
   Buat file `.env` di root direktori dan isi dengan konfigurasi:

   ```env
   # Firebase Configuration
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_auth_domain
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   FIREBASE_MEASUREMENT_ID=your_measurement_id

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_UPLOAD_PRESET=your_upload_preset

   # Kolosal AI Configuration
   KOLOSAL_API_KEY=your_api_key
   ```

4. **Jalankan Aplikasi**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Panduan Pengguna

panduan lengkap penggunaan bisa dilihat di [panduan pengguna](/USER_GUIDE.md)

## Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detailnya.

## Kontributor

- [RizalAlfadlil](https://github.com/rizalalfadlil)
- [MaseruKun](https://github.com/maserukun)

---

Dibuat dengan ❤️ untuk UMKM Indonesia
