import Header from "@/components/ui/layouts/header";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import Navigation from "@/components/ui/layouts/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className={`mt-[10vh] p-4 lg:p-8 max-w-7xl mx-auto space-y-8`}>
        <Navigation />
        {children}
      </main>
    </>
  );
}
