import React from "react";

interface AdditionalFeaturesSectionProps {
  className?: string;
}

export default function AdditionalFeaturesSection({
  className = "",
}: AdditionalFeaturesSectionProps) {
  return (
    <section id="fitur-tambahan" className={`space-y-6 ${className}`}>
      <h2 className="text-3xl font-semibold text-gray-900">Fitur Tambahan</h2>

      <div className="space-y-6">
        <div
          id="manfaat-akun-pengguna"
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Manfaat Akun Pengguna
          </h3>
          <p className="text-gray-600 mb-4">
            Meskipun aplikasi dapat digunakan tanpa akun, membuat akun
            memberikan Anda beberapa keuntungan:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <div>
                <span className="font-semibold">Riwayat Servis:</span> Semua
                catatan servis akan tersimpan dengan aman dan dapat diakses
                kapan saja di halaman{" "}
                <span className="font-semibold bg-blue-100 px-2 py-1 rounded">
                  Riwayat
                </span>
                .
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <div>
                <span className="font-semibold">Kustomisasi Kop Surat:</span>{" "}
                Tambahkan identitas bisnis Anda pada setiap laporan servis.
              </div>
            </li>
          </ul>
        </div>

        <div
          id="kustomisasi-kop-surat"
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Kustomisasi Kop Surat
          </h3>
          <p className="text-gray-600">
            Anda dapat menambahkan kop surat (logo dan nama bisnis) pada laporan
            Anda. Informasi ini dapat diisi saat pertama kali mendaftar dan
            dapat diubah kapan saja melalui halaman{" "}
            <span className="font-semibold bg-blue-100 px-2 py-1 rounded">
              Profil
            </span>
            .
          </p>
        </div>

        <div
          id="riwayat-servis"
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Riwayat Servis
          </h3>
          <p className="text-gray-600">
            Akses semua riwayat transaksi servis Anda di halaman{" "}
            <span className="font-semibold bg-blue-100 px-2 py-1 rounded">
              Riwayat
            </span>
            . Anda dapat melihat detail setiap servis dan mencetak ulang laporan
            jika diperlukan.
          </p>
        </div>
      </div>

      <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
        <p className="text-lg text-green-800 font-medium text-center">
          Terima kasih telah menggunakan Audit Servis!
        </p>
      </div>
    </section>
  );
}
