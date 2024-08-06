import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bonita-maquillaje.com"),
  title: "Bonita Maquillaje",
  description: "Bonita Maquillaje es una tienda virtual y física en la ciudad de Cúcuta. Te ofrecemos los productos más TOP de marcas Colombianas en maquillaje, skincare y accesorios.",
  authors: {
    name: "Rubert Gonzalez - Desarrollador web",
    url: "https://rubertweb.dev",
  },
  keywords: 'Bonita maquillaje, bonita, maquillaje, web, cucuta, tineda virtual, skincare, accesorios.',
  openGraph: {
    title: "Bonita Maquillaje",
    description: "Bonita Maquillaje es una tienda virtual y física en la ciudad de Cúcuta. Te ofrecemos los productos más TOP de marcas Colombianas en maquillaje, skincare y accesorios.",
    images: '/logo.webp',
    type: 'website',
    url: 'https://bonita-maquillaje.com/',
    siteName: 'Bonita Maquillaje'
  }
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
      <body className='bg-gradient-principal antialiased'>{children}</body>
    </html>
  );
}
