import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bonita Maquillaje",
  description: "Somos una tienda virtual y física en la ciudad de Cúcuta. Te ofrecemos los productos más TOP de marcas Colombianas en maquillaje, skincare y accesorios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
