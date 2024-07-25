import React from 'react'
import '@/firebase/initializeApp'
import { poppins } from '@/fonts/poppins/poppins'
import { Footer } from '@/components/common/footer'
import { ProductsAdminProvider } from '@/contexts/admin/products/products-context'

function FirebaseLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ProductsAdminProvider>
      <main className={`${poppins.className} min-h-[90vh]`}>
        {children}
      </main>
      <Footer />
    </ProductsAdminProvider>
  )
}

export default FirebaseLayout