import type { Metadata } from "next";
import "./globals.css";
import { branch } from "@/fonts/branch/branch";

export const metadata: Metadata = {
  title: "Bonita Maquillaje",
  description: "Somos una tienda virtual y física en la ciudad de Cúcuta. Te ofrecemos los productos más TOP de marcas Colombianas en maquillaje, skincare y accesorios.",
  authors: {
    name: "Rubert Gonzalez - Desarrollador web",
    url: "https://rubertweb.dev",
  },
  keywords: 'Bonita maquillaje, bonita, maquillaje, web, cucuta, tineda virtual, skincare, accesorios.',
  /* openGraph: {
    title: "Bonita Maquillaje",
    description: "Somos una tienda virtual y física en la ciudad de Cúcuta. Te ofrecemos los productos más TOP de marcas Colombianas en maquillaje, skincare y accesorios.",
    images: '/logo.webp',
    type: 'website',
    url: 'https://digi-care-physio.vercel.app/',
    siteName: 'Bonita Maquillaje'
  } */
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo.webp" type="image/webp" />
      </head>
      <body className={`${branch.className} bg-gradient-principal antialiased`}>{children}</body>
    </html>
  );
}
