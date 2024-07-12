import React from 'react'
import '@/firebase/initializeApp'
import { poppins } from '@/fonts/poppins/poppins'
import { Footer } from '@/components/common/footer'

function FirebaseLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className={`${poppins.className} min-h-[90vh]`}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default FirebaseLayout