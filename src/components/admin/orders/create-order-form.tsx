"use client"

import { Searcher } from "@/components/common/searcher"
import { ProductsForm } from "./products-form"
import { Product } from "@/types/admin/admin"
import { useState } from "react"
import { DiscountCodeInput, Input } from "@/components/common/input"
import { getDiscountCode } from "@/firebase/services/discount-codes"

export const CreateOrderForm = () => {
  const [searchedProducts, setSearchedProducts] = useState<{
    original: Product[],
    filtered: Product[]
  }>({
    original: [],
    filtered: []
  })
  const [products, setProducts] = useState<Product[]>([])
  const [loadingCode, setLoadingCode] = useState(false)

  const handleClickDiscountCode = async (code: string) => {
    setLoadingCode(true)
    const discountCode = await getDiscountCode(code)

    if (!discountCode || !discountCode.expiration) {
      setLoadingCode(false)
      return
    }

    const inDate = new Date() < new Date(discountCode.expiration.seconds * 1000)

    if (!inDate) {
      setLoadingCode(false)
      return
    }

    setProducts(products.map(p => {
      if (p.id === discountCode.category) {
        return {
          ...p,
          discountCode: {
            code: discountCode.code,
            discount: discountCode.discount
          }
        }
      }

      return p
    }))
    setLoadingCode(false)
  }

  return (
    <section className="flex flex-col-reverse gap-4 max-w-lg mx-auto lg:grid lg:grid-cols-[50%_50%] lg:gap-6 lg:max-w-none">
      <form
        className=""
        action="">
        <label
          className="text-text-100 mb-2 block"
          htmlFor="discountCode">
          Código de descuento <span className="text-accent-300">*</span>
        </label>
        <DiscountCodeInput
          id="discountCode"
          loading={loadingCode}
          onClickButton={handleClickDiscountCode}
          placeholder="Código de descuento"
        />

        <label
          className="text-text-100 mb-2 block mt-5"
          htmlFor="name">
          Nombre y apellidos <span className="text-accent-300">*</span>
        </label>
        <Input
          id="name"
          placeholder="Nombre del cliente"
        />

        <label
          className="text-text-100 mb-2 block mt-5"
          htmlFor="email">
          Email <span className="text-accent-300">*</span>
        </label>
        <Input
          id="email"
          placeholder="Correo del cliente"
        />

        <label
          className="text-text-100 mb-2 block mt-5"
          htmlFor="name">
          Precio del producto <span className="text-accent-300">*</span>
        </label>
        <Input
          type="number"
          min={0}
          id="price"
          placeholder="0"
        />
      </form>
      <aside className="mt-8">
        <Searcher placeholder="Buscar producto a agregar..." />
        <ProductsForm
          products={products}
          setProducts={setProducts}
          searchedProducts={searchedProducts}
          setSearchedProducts={setSearchedProducts}
        />
      </aside>
    </section>
  )
}