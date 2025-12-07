import type { Metadata } from "next";
import "./globals.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

export const metadata: Metadata = {
  title: "Audit Servis",
  description: "Audit Servis adalah jembatan digital yang menghubungkan profesionalisme teknisi dengan kebutuhan pelanggan akan transparansi. Kami mengubah proses servis yang manual dan penuh spekulasi menjadi alur kerja 3 tahap yang efisien dan terekam secara permanen, sehingga Anda bisa fokus pada perbaikan, bukan administrasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}

      </body>
    </html>
  );
}
