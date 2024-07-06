"use client"

import { useAuthContext } from "@/hooks/auth/use-auth-context"
import { Spinner } from "../../common/icons"
import { redirect } from "next/navigation"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext()

  if (loading) {
    return (
      <main>
        <Spinner />
      </main>
    )
  }

  if (!user) {
    return redirect("/admin")
  }

  return (
    <>
      {children}
    </>
  )
}