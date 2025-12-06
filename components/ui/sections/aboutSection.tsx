import React from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { LuTextCursorInput } from "react-icons/lu";
import { TbDevicesSearch } from "react-icons/tb";

export default function AboutSection() {
  const features = [
    {
      title: "input data pelanggan",
      description: "input data pelanggan dan perangkat yang akan di perbaiki",
      icon:<LuTextCursorInput/>
    },
    {
      title: "lakukan diagnosis",
      description: "catat semua kerusakan yang ditemukan, tulis suku cadang atau servis serta biayanya, dan foto kondisi perangkat.",
      icon:<TbDevicesSearch/>
    },
    {
      title: "simpan hasil",
      description: "simpan hasil diagnosis dalam format PDF dan kirimkan kepada pelanggan.",
      icon:<FaRegFilePdf/>
    }
  ];
  return (
    <section className="min-h-dvh p-4 md:p-8 pt-[28vh] md:pt-[28vh] max-w-7xl mx-auto space-y-8 flex flex-col">
      <p className="text-2xl font-bold">Tentang Audit Servis</p>
      <p>
        Audit Servis adalah jembatan digital yang menghubungkan profesionalisme
        teknisi dengan kebutuhan pelanggan akan transparansi. Kami mengubah
        proses servis yang manual dan penuh spekulasi menjadi alur kerja 3 tahap
        yang efisien dan terekam secara permanen, sehingga Anda bisa fokus pada
        perbaikan, bukan administrasi.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 grow">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center *:w-full justify-center">
            <div
              style={{
                backgroundColor: "var(--highlight-bg)",
                color: "var(--highlight-text-color)",
                borderRadius: "var(--border-radius)",
              }}
              className="flex flex-col items-center justify-center gap-2 text-xl p-8"
            >
              <span className="text-7xl text-gray-500">{feature.icon}</span>
              <p className="text-center font-medium">{feature.title}</p>
              <p
                className="text-center text-sm"
                style={{ color: "var(--text-color-secondary)" }}
              >
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
