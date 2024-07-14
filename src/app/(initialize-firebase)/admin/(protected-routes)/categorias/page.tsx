import { CategoriesContainer } from "@/components/admin/categories/categories-container"
import { CategoriesSkeletonContainer } from "@/components/admin/categories/categories-skeleton-container"
import { CategoryForm } from "@/components/admin/categories/category-form"
import { H1 } from "@/components/common/h1"
import { branch } from "@/fonts/branch/branch"
import { Suspense } from "react"

export default function CategoriesPage() {
  return (
    <main
      className="px-4 my-16 xl:px-0 lg:mt-20 max-w-6xl mx-auto">
      <H1 className="mb-6 mt-2">Categorías</H1>

      <Suspense fallback={<CategoriesSkeletonContainer className="mt-6 lg:mt-4" />}>
        <CategoriesContainer className="mt-6 lg:mt-4" isDelete />
      </Suspense>

      <h2 className={`${branch.className} text-text-50 text-[2rem] md:text-3xl lg:text-4xl text-center mt-6`}>Crear categoría</h2>
      <CategoryForm />
    </main>
  )
}