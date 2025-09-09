import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import { Banner } from "@/components/ui/banner";
import { isDateRegistration } from "@/actions/is-date-registration";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Club - FST Settat",
  description:
    "Code Club is a student-led initiative at FST Settat, created by engineering students passionate about turning theory into practice. Our mission is to share knowledge, build skills, and collaborate through projects, workshops, and events.",
  keywords: [
    "Code Club",
    "FST Settat",
    "Student Club",
    "Programming",
    "Workshops",
    "Projects",
    "Collaboration",
  ],
  authors: [{ name: "Code Club FST Settat" }],
  openGraph: {
    title: "Code Club - FST Settat",
    description:
      "Code Club is a student-led initiative at FST Settat, created by engineering students passionate about turning theory into practice. Our mission is to share knowledge, build skills, and collaborate through projects, workshops, and events.",
    url: "https://code.sefault.com",
    siteName: "Code Club FST Settat",
    type: "website",
    images: [
      {
        url: "https://code.sefault.com/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Code Club FST Settat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Club - FST Settat",
    description:
      "Code Club is a student-led initiative at FST Settat, created by engineering students passionate about turning theory into practice.",
    images: ["https://code.sefault.com/og-image.webp"],
  },
  icons: [
    {
      rel: "icon",
      url: "/icons/favicon-dark.ico",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      url: "/icons/favicon-dark.ico",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isRegistrationOpen = await isDateRegistration();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {isRegistrationOpen && (
            <Banner
              variant="rainbow"
              rainbowColors={[
                "rgba(255,100,0, 0.5)",
                "rgba(255,100,0, 0.5)",
                "transparent",
                "rgba(255,100,0, 0.5)",
                "transparent",
                "rgba(255,100,0, 0.5)",
                "transparent",
              ]}
              className="border-b border-secondary flex flex-wrap  items-center justify-center pb-1 text-center break-all"
            >
              <span className="whitespace-nowrap">
                🎉 Registration is now open! Go to
              </span>
              <Link
                className="mx-1 font-semibold underline whitespace-nowrap"
                href="/register"
                rel="noopener"
              >
                the registration page
              </Link>
              <span className="whitespace-nowrap">to secure your spot.</span>
            </Banner>
          )}

          {children}

          <Analytics />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
