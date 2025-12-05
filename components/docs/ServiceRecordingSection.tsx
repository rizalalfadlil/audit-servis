import React from "react";

interface ServiceRecordingSectionProps {
  className?: string;
}

export default function ServiceRecordingSection({
  className = "",
}: ServiceRecordingSectionProps) {
  return (
    <section
      id="fitur-utama-pencatatan-servis"
      className={`space-y-6 ${className}`}
    >
      <h2 className="text-3xl font-semibold text-gray-900">
        Fitur Utama: Pencatatan Servis
      </h2>

      <p className="text-gray-600">
        Proses pencatatan servis dibagi menjadi tiga langkah mudah:
      </p>

      <div className="space-y-6">
        <div
          id="langkah-1-informasi-pelanggan-dan-keluhan"
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Langkah 1: Informasi Pelanggan dan Keluhan
          </h3>
          <p className="text-gray-600 mb-4">
            Pada langkah ini, Anda akan diminta untuk memasukkan:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <div>
                <span className="font-semibold">Informasi Pelanggan:</span> Nama
                dan kontak (nomor telepon atau email).
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <div>
                <span className="font-semibold">Informasi Perangkat:</span> Nama
                perangkat (misalnya, laptop, ponsel).
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <div>
                <span className="font-semibold">Keluhan:</span> Deskripsi
                keluhan yang disampaikan oleh pelanggan.
              </div>
            </li>
          </ul>
        </div>

        <div
          id="langkah-2-diagnosis-kerusakan-dan-rencana-perbaikan"
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Langkah 2: Diagnosis Kerusakan dan Rencana Perbaikan
          </h3>
          <p className="text-gray-600 mb-4">
            Setelah memeriksa perangkat, catat temuan Anda secara detail:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <div>
                <span className="font-semibold">Kerusakan:</span> Catat setiap
                kerusakan yang ditemukan dan tentukan tingkat keparahannya.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <div>
                <span className="font-semibold">Rencana Perbaikan:</span>{" "}
                Tuliskan semua tindakan perbaikan yang diperlukan, termasuk:
                <ul className="ml-6 mt-2 space-y-1">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">-</span>
                    <div>
                      <span className="font-semibold">Jenis:</span> Apakah
                      perbaikan berupa barang (penggantian suku cadang) atau
                      jasa.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">-</span>
                    <div>
                      <span className="font-semibold">Harga:</span> Masukkan
                      harga untuk setiap item perbaikan.
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <div>
                <span className="font-semibold">Status Servis:</span> Perbarui
                status pengerjaan servis (misalnya, &quot;Dalam
                Pengerjaan&quot;, &quot;Menunggu Suku Cadang&quot;).
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <div>
                <span className="font-semibold">Total Harga:</span> Akan
                dihitung secara otomatis berdasarkan daftar perbaikan.
              </div>
            </li>
          </ul>
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              Setelah semua informasi terisi, klik tombol{" "}
              <span className="font-semibold">Selesai</span>.
            </p>
          </div>
        </div>

        <div
          id="langkah-3-tinjau-dan-simpan-laporan"
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Langkah 3: Tinjau dan Simpan Laporan
          </h3>
          <p className="text-gray-600 mb-4">Di langkah terakhir, Anda dapat:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <div>
                <span className="font-semibold">Melihat Pratinjau:</span> Tinjau
                kembali seluruh informasi dalam format laporan yang siap
                dibagikan.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <div>
                <span className="font-semibold">Simpan dan Unduh:</span> Simpan
                laporan dalam format digital untuk diunduh. Laporan ini dapat
                Anda bagikan kepada pelanggan sebagai bukti servis yang
                transparan. Jika Anda masuk ke akun Anda, laporan ini juga akan
                tersimpan secara otomatis di riwayat servis Anda.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
