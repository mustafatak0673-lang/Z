import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ELİT YAPI | Premium İnşaat & Mimari",
  description: "25 yıllık tecrübe ile premium inşaat ve mimari çözümler.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
