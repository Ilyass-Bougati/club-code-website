import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "code | home",
};

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
