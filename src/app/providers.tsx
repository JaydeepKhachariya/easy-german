"use client";

import { ThemeProvider } from "next-themes";

import { StorageInit } from "@/components/layout/storage-init";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <StorageInit />
      <Toaster richColors closeButton position="top-center" />
    </ThemeProvider>
  );
}
