import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
