"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { useState } from "react";
import LoginForm from "../forms/loginForm";
import { checkLogin } from "@/backend/controller/auth";

const WelcomeSection = () => {
  const router = useRouter();
  const [openLogin, setOpenLogin] = useState(false);
  const [isLoggedIn] = useState(checkLogin());

  return (
    <section className="h-dvh flex flex-col justify-center items-center">
      <div className="flex flex-col gap-2 text-center justify-center items-center">
        <p className="text-4xl font-bold">
          Laporkan Servis Sejelas Kristal. Tanpa Biaya Tersembunyi.
        </p>
        <p className="text-lg">
          Sistem Audit Digital pertama yang dirancang khusus untuk UMKM
          perbaikan, memutus keraguan pelanggan.
        </p>
        <div className="flex gap-2 mt-4">
          <LoginForm openLogin={openLogin} setOpenLogin={setOpenLogin} />
          <Button
            label="Coba Sekarang"
            onClick={() =>
              isLoggedIn ? router.push("/app") : setOpenLogin(true)
            }
          />
          <Button label="Lihat Panduan" className="p-button-outlined" />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
