import { Nav } from "@/components/admin/common/nav"
import { ProtectedRoute } from "@/components/admin/common/protected-route"
import { ProductsAdminProvider } from "@/contexts/admin/products/products-context"
import { ReactNode } from "react"

function AdminLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <ProtectedRoute>
      <ProductsAdminProvider>
        <Nav />
        {
          children
        }
      </ProductsAdminProvider>
    </ProtectedRoute>
  )
}

export default AdminLayout