"use client";

import { useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const header = (
    <div className="flex align-items-center gap-2">
      <i className="pi pi-exclamation-triangle text-red-500 text-4xl" />
      <span className="text-2xl font-semibold">Terjadi Kesalahan</span>
    </div>
  );

  const footer = (
    <div className="flex flex-wrap gap-2 justify-content-end">
      <Button
        label="Kembali ke Beranda"
        icon="pi pi-home"
        onClick={() => router.push("/")}
        className="p-button-outlined"
      />
      <Button
        label="Coba Lagi"
        icon="pi pi-refresh"
        onClick={() => reset()}
        className="p-button-primary"
      />
    </div>
  );

  return (
    <div className="flex align-items-center justify-content-center min-h-screen p-4">
      <Card
        header={header}
        footer={footer}
        className="w-full max-w-7xl shadow-2"
      >
        <div className="space-y-4">
          <p className="m-0">
            Maaf, terjadi kesalahan saat memuat halaman. Silakan coba lagi atau
            kembali ke halaman utama.
          </p>
          {process.env.NODE_ENV === "development" && (
            <div className="p-3 bg-gray-100 border-round">
              <p className="font-semibold m-0 mb-2">Error details:</p>
              <code className="text-sm block overflow-auto p-2 bg-gray-800 text-white rounded">
                {error.message || "Unknown error"}
              </code>
              {error.digest && (
                <p className="text-sm mt-2 mb-0">
                  <span className="font-semibold">Digest:</span> {error.digest}
                </p>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
