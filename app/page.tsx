"use client";
import WelcomeSection from "../components/ui/sections/welcomeSection";
import AboutSection from "../components/ui/sections/aboutSection";
export default function Page() {
  return (
    <>
      <header className="fixed top-0 p-8 w-full z-10">
        <nav className="p-4 border border-gray-200 flex justify-between w-full bg-white rounded-lg">header</nav>
        
        </header>
      <WelcomeSection />
      <AboutSection />
    </>
  );
}
