import React from "react";
import UserGuide from "@/components/docs/UserGuide";
import Header from "@/components/ui/layouts/header";
import Footer from "@/components/ui/layouts/footer";

export default function Page() {
  return (
    <div className="pt-8 mt-[20vh] min-h-dvh flex flex-col">
      <Header />
      <div className="grow mb-8">
        <UserGuide />
      </div>
      <Footer />
    </div>
  );
}
