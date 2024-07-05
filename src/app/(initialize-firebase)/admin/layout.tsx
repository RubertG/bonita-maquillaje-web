import { Nav } from "@/components/admin/nav"
import { ReactNode } from "react"

function AdminLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <>
      <Nav />
      {
        children
      }
    </>
  )
}

export default AdminLayout