import React from "react";

interface TableOfContentsProps {
  className?: string;
}

export default function TableOfContents({
  className = "",
}: TableOfContentsProps) {
  return (
    <div className={`bg-gray-50 p-6 rounded-lg ${className}`}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Daftar Isi</h2>
      <ul className="space-y-2 text-gray-700">
        <li>
          <a
            href="#tentang-aplikasi"
            className="hover:text-blue-600 transition-colors"
          >
            1. Tentang Aplikasi
          </a>
        </li>
        <li>
          <a href="#memulai" className="hover:text-blue-600 transition-colors">
            2. Memulai
          </a>
        </li>
        <li>
          <a
            href="#fitur-utama-pencatatan-servis"
            className="hover:text-blue-600 transition-colors"
          >
            3. Fitur Utama: Pencatatan Servis
          </a>
          <ul className="ml-6 mt-1 space-y-1 text-sm">
            <li>
              <a
                href="#langkah-1-informasi-pelanggan-dan-keluhan"
                className="hover:text-blue-600 transition-colors"
              >
                • Langkah 1: Informasi Pelanggan dan Keluhan
              </a>
            </li>
            <li>
              <a
                href="#langkah-2-diagnosis-kerusakan-dan-rencana-perbaikan"
                className="hover:text-blue-600 transition-colors"
              >
                • Langkah 2: Diagnosis Kerusakan dan Rencana Perbaikan
              </a>
            </li>
            <li>
              <a
                href="#langkah-3-tinjau-dan-simpan-laporan"
                className="hover:text-blue-600 transition-colors"
              >
                • Langkah 3: Tinjau dan Simpan Laporan
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a
            href="#fitur-tambahan"
            className="hover:text-blue-600 transition-colors"
          >
            4. Fitur Tambahan
          </a>
          <ul className="ml-6 mt-1 space-y-1 text-sm">
            <li>
              <a
                href="#manfaat-akun-pengguna"
                className="hover:text-blue-600 transition-colors"
              >
                • Manfaat Akun Pengguna
              </a>
            </li>
            <li>
              <a
                href="#kustomisasi-kop-surat"
                className="hover:text-blue-600 transition-colors"
              >
                • Kustomisasi Kop Surat
              </a>
            </li>
            <li>
              <a
                href="#riwayat-servis"
                className="hover:text-blue-600 transition-colors"
              >
                • Riwayat Servis
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
