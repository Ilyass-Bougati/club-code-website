import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import React from "react";


export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background text-foreground flex min-h-[100dvh] flex-col items-center justify-items-center">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
