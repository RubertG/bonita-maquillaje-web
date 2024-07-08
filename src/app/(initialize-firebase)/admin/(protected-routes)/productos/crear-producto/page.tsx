import { ProductForm } from "@/components/admin/products/product-form"
import { H1 } from "@/components/common/h1"

export default function CreateProductPage() {
  return (
    <main className="px-4 my-16 lg:px-0 lg:mt-20 max-w-6xl mx-auto">
      <H1 className="mb-6">Crear producto</H1>
      <ProductForm />
    </main>
  )
}