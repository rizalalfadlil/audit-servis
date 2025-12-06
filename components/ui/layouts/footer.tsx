import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border border-gray-200 ">
      <div className="max-w-7xl mx-auto p-8 flex justify-between items-center">
        <div>
          <Link
            href="/"
            className="font-bold hover:underline"
            style={{
              color: "var(--primary-color)",
            }}
          >
            Audit Servis
          </Link>{" "}
          oleh{" "}
          <Link
            href="https://github.com/RizalAlfadlil"
            className="font-bold hover:underline"
          >
            RizalAlfadlil
          </Link>{" "}
          dan{" "}
          <Link
            href="https://github.com/MaseruKun"
            className="font-bold hover:underline"
          >
            MaseruKun
          </Link>
        </div>
        <div className="text-sm flex gap-4">
          <Link href="/docs" className="hover:underline">
            panduan
          </Link>
          <Link href="/" className="hover:underline">
            beranda
          </Link>
        </div>
      </div>
    </footer>
  );
}
