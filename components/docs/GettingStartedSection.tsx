import React from "react";

interface GettingStartedSectionProps {
  className?: string;
}

export default function GettingStartedSection({
  className = "",
}: GettingStartedSectionProps) {
  return (
    <section id="memulai" className={`space-y-4 ${className}`}>
      <h2 className="text-3xl font-semibold text-gray-900">Memulai</h2>
      <p className="text-gray-600">
        Untuk memulai, ikuti langkah-langkah berikut:
      </p>
      <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
        <li>
          Tekan tombol{" "}
          <span className="font-semibold bg-blue-100 px-2 py-1 rounded">
            Coba Sekarang
          </span>{" "}
          pada halaman utama.
        </li>
        <li>
          Sebuah jendela pop-up akan muncul. Anda dapat memilih untuk
          <span className="font-semibold bg-blue-100 px-2 py-1 rounded mx-1">
            Masuk (Login)
          </span>{" "}
          atau
          <span className="font-semibold bg-blue-100 px-2 py-1 rounded mx-1">
            Daftar (Register)
          </span>
          untuk mengakses fitur tambahan, atau melanjutkan tanpa akun.
        </li>
        <li>
          Anda akan diarahkan ke halaman aplikasi utama untuk memulai proses
          pencatatan servis.
        </li>
      </ol>
    </section>
  );
}
