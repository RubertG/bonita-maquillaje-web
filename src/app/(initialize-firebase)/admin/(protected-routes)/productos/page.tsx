import { CategoriesContainer } from "@/components/admin/categories/categories-container"
import { CategoriesSkeletonContainer } from "@/components/admin/categories/categories-skeleton-container"
import { ProductsContainer } from "@/components/admin/products/products-container"
import { ButtonWithIcon } from "@/components/common/button-with-icon"
import { H1 } from "@/components/common/h1"
import { Store } from "@/components/common/icons"
import { Searcher } from "@/components/common/searcher"
import { Suspense } from "react"

async function ProductsPage() {

  return (
    <main
      className="px-4 my-16 xl:px-0 lg:mt-20 max-w-6xl mx-auto"
    >
      <H1 className="mb-6">Productos</H1>
      <section className="sm:flex sm:flex-row sm:justify-center sm:items-center max-w-3xl mx-auto gap-3">
        <Searcher />
        <ButtonWithIcon
          className="w-full sm:w-auto mt-5 sm:mt-0 sm:py-2 whitespace-nowrap"
          href="/admin/productos/crear-producto">
          <Store className="absolute top-1/2 -translate-y-1/2 left-0 ml-3.5 sm:relative sm:top-0 sm:translate-y-0 sm:ml-0 stroke-text-100 w-6" />
          Añadir producto
        </ButtonWithIcon>
      </section>
      <Suspense fallback={<CategoriesSkeletonContainer className="mt-6 lg:mt-4" />}>
        <CategoriesContainer className="mt-6 lg:mt-4" />
      </Suspense>
      <ProductsContainer className="mt-6" />
    </main>
  )
}

export default ProductsPage