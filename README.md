# Dokumentasi Proyek Aplikasi Pelaporan Layanan

Aplikasi ini adalah platform berbasis web yang dirancang untuk membantu bisnis dalam melaporkan dan mengelola masalah layanan. Pengguna dapat membuat laporan, mengunggah gambar sebagai bukti, dan menerima saran atau tindakan yang direkomendasikan.

## Fitur Utama

-   **Autentikasi Pengguna**: Sistem login dan registrasi untuk pemilik bisnis.
-   **Pelaporan Masalah**: Formulir untuk mengirimkan detail masalah layanan.
-   **Unggah Gambar**: Pengguna dapat mengunggah gambar terkait masalah (menggunakan Cloudinary).
-   **Penyimpanan Data**: Laporan layanan disimpan dan dikelola menggunakan Firestore.
-   **Tampilan Hasil**: Menampilkan hasil atau saran berdasarkan laporan yang dikirim.
-   **Ekspor ke PDF**: Kemampuan untuk mengekspor laporan ke dalam format PDF (fitur dalam pengembangan).

## Teknologi yang Digunakan

-   **Frontend**: Next.js (React) & TypeScript
-   **Styling**: Tailwind CSS
-   **Backend**: Next.js API Routes
-   **Database**: Google Firestore
-   **Penyimpanan File**: Cloudinary
-   **Bahasa**: TypeScript

## Struktur Proyek

-   `app/`: Berisi halaman-halaman utama aplikasi (menggunakan App Router Next.js).
-   `backend/`: Logika sisi server, termasuk controller untuk otentikasi dan layanan.
-   `components/`: Komponen-komponen React yang dapat digunakan kembali.
-   `public/`: Aset statis seperti gambar dan ikon.
-   `types/`: Definisi tipe TypeScript untuk konsistensi data.
-   `utils/`: Fungsi-fungsi bantuan.

## Cara Menjalankan Proyek

1.  **Clone Repository**
    ```bash
    git clone [URL_REPOSITORY_ANDA]
    cd [NAMA_FOLDER_PROYEK]
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment Variables**
    Buat file `.env.local` di root proyek dan isi dengan kredensial yang dibutuhkan.

    ```
    # Kredensial Firebase
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
    NEXT_PUBLIC_FIREBASE_APP_ID=...

    # Kredensial Cloudinary
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
    NEXT_PUBLIC_CLOUDINARY_API_KEY=...
    CLOUDINARY_API_SECRET=...
    ```

4.  **Jalankan Development Server**
    ```bash
    npm run dev
    ```

    Buka [http://localhost:3000](http://localhost:3000) di browser Anda.
