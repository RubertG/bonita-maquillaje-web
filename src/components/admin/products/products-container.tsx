"use client"

import { Product } from "./product"
import { ButtonWithIcon } from "@/components/common/button-with-icon"
import { Delete } from "@/components/common/icons"
import { useProductsContext } from "@/hooks/admin/products/use-products-context"
import { ProductSkeleton } from "./product-skeleton"

export const ProductsContainer = ({
  className
}: {
  className?: string
}) => {
  const { loading, products, searchParams } = useProductsContext()

  return (
    <>
      <ul className={`${className} grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2`}>
        {
          loading ? (
            Array(9).fill(0).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            products.map(product => (
              <Product
                key={product.id}
                {...product}
              />
            ))
          )
        }
      </ul>

      {
        ((!products || products.length === 0) && !loading) && (
          <section className={`${className} text-center text-text-300`}>
            No se encontraron productos :(
            <article className="mt-3 mx-auto">
              {
                (searchParams.busqueda) && (
                  <ButtonWithIcon
                    href={`/admin/productos?${new URLSearchParams({
                      categoria: searchParams.categoria || ""
                    }).toString()}`}>
                    <Delete className="stroke-text-100" />
                    Quitar filtros
                  </ButtonWithIcon>
                )
              }
            </article>
          </section>
        )
      }
    </>
  )
}