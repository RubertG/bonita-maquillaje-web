import React from 'react'
import '@/firebase/initializeApp'
import { poppins } from '@/fonts/poppins/poppins'

function FirebaseLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className={`${poppins.className}`}>
      {children}
    </main>
  )
}

export default FirebaseLayout