import React from "react";

interface AboutSectionProps {
  className?: string;
}

export default function AboutSection({ className = "" }: AboutSectionProps) {
  return (
    <section id="tentang-aplikasi" className={`space-y-4 ${className}`}>
      <h2 className="text-3xl font-semibold text-gray-900">Tentang Aplikasi</h2>
      <p className="text-gray-600 leading-relaxed">
        Aplikasi ini dirancang untuk membantu para pelaku UMKM dalam mencatat
        setiap proses servis secara transparan, mulai dari penerimaan barang
        hingga selesai perbaikan. Dengan pencatatan yang detail, Anda dapat
        meningkatkan kepercayaan pelanggan dan profesionalisme bisnis Anda.
      </p>
    </section>
  );
}
