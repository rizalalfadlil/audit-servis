"use client"
import Header from "@/components/ui/layouts/header";
import Footer from "@/components/ui/layouts/footer";
import { MarkdownRenderer } from "@/components/ui/markdown/MarkdownRenderer";
import { useEffect, useState } from "react";

export default function Page() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/USER_GUIDE.md")
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);
  

  return (
    <div className="pt-8 mt-[20vh] min-h-dvh flex flex-col">
      <Header />
      <div className="grow mb-8 max-w-7xl mx-auto p-4">
        <MarkdownRenderer content={content} />
      </div>
      <Footer />
    </div>
  );
}
