import { getProducts } from "@/firebase/services/products"
import { Product } from "./product"

export const ProductsContainer = async ({ className }: { className?: string }) => {
  const products = await getProducts()

  if (!products) return (
    <section className={`${className} text-center text-text-200`}>
      No hay productos :(
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