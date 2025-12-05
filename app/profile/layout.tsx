import Header from "@/components/ui/layouts/headerLayout";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <><Header /><main
      className={`mt-[20vh] p-4 lg:p-8 max-w-7xl mx-auto`}
    >
      {children}
    </main></>
  );
}
