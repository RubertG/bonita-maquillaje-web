import { SquarePlus, Delete } from "@/components/common/icons"
import { getCategories } from "@/firebase/services/categories"
import Link from "next/link"
import { Category } from "@/components/common/category"

interface Props {
  className?: string
  addCategory?: boolean
}

export const CategoriesContainer = async ({ className, addCategory = true }: Props) => {
  const categories = await getCategories()

  if (!categories) return null

  return (
    <section className={`${className} flex gap-2 items-center overflow-x-auto scrollbar-hide md:justify-center`}>
      {
        categories.map(category => (
          <Category {...category} key={category.id} />
        ))
      }
      {
        addCategory ? (
          <Link
            className="p-2 rounded-lg lg:hover:bg-bg-200 transition-colors"
            href={`/admin/categorias`}
          >
            <SquarePlus className="w-14 h-14 object-cover m-auto stroke-accent-300 mb-1" />
            <h2
              className="text-sm text-accent-300 text-center font-light"
            >Añadir</h2>
          </Link>
        ) : (
          <Link
            className="p-2 rounded-lg lg:hover:bg-bg-200 transition-colors"
            href={`/admin/categorias`}
          >
            <Delete className="w-14 h-14 object-cover m-auto stroke-accent-300 mb-1 stroke-1" />
            <h2
              className="text-sm text-accent-300 text-center font-light"
            >Quitar filtros</h2>
          </Link>
        )
      }

    </section>
  )
}