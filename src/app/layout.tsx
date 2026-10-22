import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Deutsch Bridge", template: "%s · Deutsch Bridge" },
  description:
    "Learn German A1 by starting from English. Short lessons, exercises and vocab review that run in your browser.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh font-sans antialiased`}
      >
        <Providers>
          <SiteHeader />
          <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
