import { CategoriesContainer } from "@/components/admin/products/categories-container"
import { H1 } from "@/components/common/h1"
import { Searcher } from "@/components/common/searcher"
import { getCategories } from "@/firebase/services/categories"
import { redirect } from "next/navigation"
import { Suspense } from "react"

async function ProductsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { categoria: category } = searchParams

  if (!category) {
    const categories = await getCategories()
    return redirect(`/admin/productos?categoria=${categories[0].id}`)
  }

  return (
    <main
      className="mx-4 my-16 lg:mt-20"
    >
      <H1 className="mb-6">Productos</H1>
      <Searcher />
      <Suspense fallback={<></>}>
        <CategoriesContainer className="mt-6 lg:mt-4" />
      </Suspense>
      <Suspense fallback={<>cargando productos...</>}>
        <div className="mt-10"></div>
      </Suspense>
    </main>
  )
}

export default ProductsPage