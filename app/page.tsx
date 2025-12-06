"use client";
import WelcomeSection from "../components/ui/sections/welcomeSection";
import AboutSection from "../components/ui/sections/aboutSection";
import Footer from "@/components/ui/layouts/footer";
import Link from "next/link";
import { checkLogin } from "@/backend/controller/auth";
import { useState } from "react";
import { Button } from "primereact/button";
import LoginForm from "@/components/ui/forms/loginForm";

export default function Page() {
  const [openLogin, setOpenLogin] = useState(false);
  const [isLoggedIn] = useState(checkLogin());
  return (
    <>
    <LoginForm openLogin={openLogin} setOpenLogin={setOpenLogin} />
      <header className="fixed top-0 p-8 w-full z-10">
        <nav className="p-4 ps-8 border border-gray-200 flex justify-between w-full bg-white rounded-lg max-w-7xl mx-auto">
          <ul className="flex gap-4 *:hover:text-cyan-500 items-center w-full">
            <li className="grow">
              <Link href="#" className="font-bold text-xl text-cyan-500">
                Audit Servis
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:underline">
                tentang
              </Link>
            </li>
            <li>
              <Button
                text
                onClick={() => setOpenLogin(true)}
                label="coba sekarang"
              />
            </li>
          </ul>
        </nav>
      </header>
      <WelcomeSection />
      <div id="about">
        <AboutSection />
      </div>
      <Footer />
    </>
  );
}

