"use client";
import WelcomeSection from "../components/ui/sections/welcomeSection";
import AboutSection from "../components/ui/sections/aboutSection";
import Footer from "@/components/ui/layouts/footer";

export default function Page() {
  return (
    <>
      <header className="fixed top-0 p-8 w-full z-10">
        <nav className="p-4 border border-gray-200 flex justify-between w-full bg-white rounded-lg max-w-7xl mx-auto">
          <ul className="flex gap-4">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
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

