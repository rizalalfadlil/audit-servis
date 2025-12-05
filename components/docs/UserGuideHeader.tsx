import React from "react";

interface UserGuideHeaderProps {
  className?: string;
}

export default function UserGuideHeader({
  className = "",
}: UserGuideHeaderProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h1 className="text-4xl font-bold text-gray-900">
        Panduan Pengguna - Audit Servis
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed">
        Selamat datang di Audit Servis. Panduan ini akan membantu Anda memahami
        dan menggunakan fitur-fitur aplikasi kami secara maksimal untuk
        meningkatkan efisiensi dan transparansi bisnis Anda.
      </p>
    </div>
  );
}
