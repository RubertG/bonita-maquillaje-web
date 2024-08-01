import { getCategories } from "@/firebase/services/categories"
import { Category } from "@/components/common/category"

interface Props {
  className?: string
}

export const CategoriesContainer = async ({ className }: Props) => {
  const categories = await getCategories()

  if (!categories) return null

  return (
    <section className={`${className} flex gap-2 items-center overflow-x-auto scrollbar-hide justify-center`}>
      {
        categories.map(category => (
          <Category {...category} key={category.id} />
        ))
      }
    </section>
  )
}