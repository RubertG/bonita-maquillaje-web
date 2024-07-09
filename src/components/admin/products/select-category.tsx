import { SelectInput } from "@/components/common/input"
import { getCategories } from "@/firebase/services/categories"

export const SelectCategory = async ({ className }: { className?: string }) => {
  const categories = await getCategories()

  if (!categories) return (
    <p className="text-text-200 font-light my-2">No hay categorías registradas :(</p>
  )

  const items = categories.map(category => ({
    name: category.name,
    id: category.id
  }))

  return (
    <SelectInput
      className={className}
      title="Selecciona la categoría"
      items={items}
      id="category"
      name="category"
      placeholder="Categoría"
    />
  )
}