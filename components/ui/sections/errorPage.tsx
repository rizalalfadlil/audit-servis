"use client"
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import React from "react";

export default function ErrorPage({
  code,
}: {
  code: "401" | "404" | "500";
}) {
  const messages = {
    "401": "Anda Tidak Memiliki Akses Untuk Halaman Ini",
    "404": "Halaman Tidak Ditemukan",
    "500": "Terjadi kesalahan pada server",
  };
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center border h-dvh space-y-8">
      <p className="text-2xl font-bold">{messages[code]}</p>
      <Button label="Kembali ke halaman utama" onClick={() => router.push("/")} />
    </div>
  );
}
