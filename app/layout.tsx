import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Biodinâmica Pro - Aprenda Biomecânica Jogando",
  description: "Explore a biomecânica do corpo humano através de jogos interativos e divertidos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
