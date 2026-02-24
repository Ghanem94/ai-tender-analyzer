import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/providers/modal-provider";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Tender Analyzer",
  description: "Premium AI-powered tender analysis platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} scroll-smooth`}>
      <body className="antialiased bg-background text-foreground font-cairo">
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
