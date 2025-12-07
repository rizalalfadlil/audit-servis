"use client";
import WelcomeSection from "../components/ui/sections/welcomeSection";
import AboutSection from "../components/ui/sections/aboutSection";
import Footer from "@/components/ui/layouts/footer";
import Link from "next/link";
import { checkLogin } from "@/backend/controller/auth";
import { useState } from "react";
import { Button } from "primereact/button";
import LoginForm from "@/components/ui/forms/loginForm";
import { Sidebar } from "primereact/sidebar";

export default function Page() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isLoggedIn] = useState(checkLogin());
  return (
    <>
      <LoginForm openLogin={openLogin} setOpenLogin={setOpenLogin} />
      <Sidebar className="sm:hidden" visible={openSidebar} title="navigasi" onHide={() => setOpenSidebar(false)}>
        <nav>
          <ul className="grid gap-8">
            <li>
              <Link href="#" className="font-bold text-2xl text-cyan-500">
              Audit Servis
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:underline">
              tentang
              </Link>
            </li>
            <li>
              <Button className="w-full"
              onClick={() => setOpenLogin(true)}
              label="coba sekarang"
              />
            </li>
          </ul>
        </nav>
      </Sidebar>
      <header className="fixed top-0 p-8 w-full z-10">
        <div className="flex justify-end w-full sm:hidden">
          <Button
            onClick={() => setOpenSidebar(!openSidebar)}
            className="p-button-outlined"
            icon="pi pi-bars" />
        </div>
        <nav className="p-4 hidden sm:block ps-8 border border-gray-200 flex justify-between w-full bg-white rounded-lg max-w-7xl mx-auto">
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

