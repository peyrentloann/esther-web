import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Esther Laframboise — Naturothérapeute & Maître Reiki",
  description:
    "Soins Reiki, accompagnement hormonal et événements de bien-être à Shefford, Québec.",
  keywords: ["reiki", "naturothérapie", "soin hormonal", "Shefford", "Québec", "bien-être"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${notoSerif.variable}`}>
      <body className="bg-surface text-on-surface antialiased">
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
