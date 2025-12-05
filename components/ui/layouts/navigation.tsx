"use client";
import { usePathname } from "next/navigation";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  const pathParts = pathname.split("/").filter((part) => part !== "");
  const items = pathParts.map((part, index) => ({
    label: part,
    url: `/${pathParts.slice(0, index + 1).join("/")}`,
  }));
  const home = { icon: "pi pi-home", url: "/app" };

  return (
    <>
      <Button
        label="Kembali"
        icon="pi pi-arrow-left"
        severity="secondary"
        className="mb-8"
        onClick={() => window.location.href = "/app"}
      />
      <BreadCrumb model={items} home={home} className="mt-8" />
    </>
  );
}
