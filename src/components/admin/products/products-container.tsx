import { getProducts } from "@/firebase/services/products"
import { Product } from "./product"
import { ButtonWithIcon } from "@/components/common/button-with-icon"
import { Delete } from "@/components/common/icons"

export const ProductsContainer = async ({
  className, searchParams
}: {
  className?: string,
  searchParams: { [key: string]: string | undefined }
}) => {
  const products = await getProducts({
    category: searchParams.categoria || "",
    search: searchParams.busqueda || ""
  })

  if (!products || products.length === 0) return (
    <section className={`${className} text-center text-text-300`}>
      No se encontraron productos :(
      <article className="mt-3 mx-auto">
        <ButtonWithIcon
          href={`/admin/productos?${new URLSearchParams({
            categoria: searchParams.categoria || ""
          }).toString()}`}>
          <Delete className="stroke-text-100" />
          Quitar filtros
        </ButtonWithIcon>
      </article>
    </section>
  )

  return (
    <ul className={`${className} grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2`}>
      {products.map(product => (
        <Product
          key={product.id}
          {...product}
        />
      ))}
    </ul>
  )
}