import type { Metadata } from "next"
import "./globals.css"
import { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { Footer } from "@/components/common/footer"

export const metadata: Metadata = {
  metadataBase: new URL("https://bonita-maquillaje.vercel.app"),
  title: "Bonita Maquillaje",
  description: "Somos una tienda virtual y física en la ciudad de Cúcuta. Te ofrecemos los productos más TOP de marcas Colombianas en maquillaje, skincare y accesorios.",
  authors: {
    name: "Rubert Gonzalez - Desarrollador web",
    url: "https://rubertweb.dev"
  },
  keywords: 'Bonita maquillaje, bonita, maquillaje, web, cucuta, tineda virtual, skincare, accesorios.',
  openGraph: {
    title: "Bonita Maquillaje",
    description: "Somos una tienda virtual y física en la ciudad de Cúcuta. Te ofrecemos los productos más TOP de marcas Colombianas en maquillaje, skincare y accesorios.",
    images: '/logo.webp',
    type: 'website',
    url: 'https://bonita-maquillaje.vercel.app/',
    siteName: 'Bonita Maquillaje'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo.webp" type="image/webp" />
      </head>
      <body className='antialiased bg-bg-100'>
        <SkeletonTheme baseColor="#fcdee9" highlightColor="#fff4f4">
          {children}
        </SkeletonTheme>
        <Footer />
      </body>
    </html >
  )
}
