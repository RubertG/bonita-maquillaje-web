"use client"

import { ProductsForm } from "./products-form"
import { InputsOrders, Product } from "@/types/admin/admin"
import { useEffect, useState } from "react"
import { getDiscountCode } from "@/firebase/services/discount-codes"
import { ALL_CATEGORY } from "@/consts/admin/orders"
import { useForm } from "@/hooks/common/use-form"
import { orderSchema } from "@/validations/admin/orders/order-schema"
import { OrderForm } from "./order-form"
import { Order } from "@/types/db/db"
import { v4 as uuidv4 } from 'uuid'
import { Timestamp } from "firebase/firestore"
import { saveOrder } from "@/firebase/services/orders"
import { useRouter } from "next/navigation"
import { removeStorage } from "@/utils/orders-storage"

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
  const [errorDiscountCode, setErrorDiscountCode] = useState("")
  const [errorProducts, setErrorProducts] = useState("")
  const [errorSubmit, setErrorSubmit] = useState("")
  const router = useRouter()
  const { errors, handleSubmit, loading, register } = useForm<InputsOrders>({
    schema: orderSchema,
    actionSubmit: async (inputs) => {
      if (products.length === 0) {
        setErrorProducts("Se requiere cargar al menos un producto")
        return
      }

      try {
        const order: Order = {
          ...inputs,
          id: uuidv4(),
          products: products.map(p => ({
            id: p.id,
            amount: p.amount,
            ...(p.discountCode ? { discountCode: p.discountCode.code } : {})
          })),
          create_at: Timestamp.now(),
          phone: Number(inputs.phone),
          state: false
        }
        await saveOrder(order)
        removeStorage()
        router.push("/admin/pedidos")
      } catch (err) {
        setErrorSubmit("Error al crear el pedido")
      }
    }
  })

  useEffect(() => {
    setErrorSubmit("")
    setErrorProducts("")
  }, [searchedProducts.filtered])

  useEffect(() => {
    setErrorSubmit("")
  }, [errors])

  const handleClickDiscountCode = async (code: string) => {
    setErrorDiscountCode("")
    setLoadingCode(true)
    const discountCode = await getDiscountCode(code)

    if (!discountCode || !discountCode.expiration) {
      setErrorDiscountCode("Código de descuento inválido")
      setLoadingCode(false)
      return
    }

    const inDate = new Date() < new Date(discountCode.expiration.seconds * 1000)

    if (!inDate) {
      setErrorDiscountCode("Código de descuento expirado")
      setLoadingCode(false)
      return
    }

    const newProducts = products.map(p => {
      if (p.category === discountCode.category || discountCode.category === ALL_CATEGORY) {
        return {
          ...p,
          discountCode: {
            code: discountCode.code,
            discount: discountCode.discount
          }
        }
      }

      return p
    })
    setProducts(newProducts)
    setLoadingCode(false)
  }

  return (
    <section className="flex flex-col-reverse gap-4 max-w-lg mx-auto lg:grid lg:grid-cols-[50%_50%] lg:gap-6 lg:max-w-none">
      <article className="mt-3 lg:mt-0">
        <OrderForm
          errors={errors}
          loading={loading}
          handleClickDiscountCode={handleClickDiscountCode}
          loadingCode={loadingCode}
          errorDiscountCode={errorDiscountCode}
          setErrorDiscountCode={setErrorDiscountCode}
          handleSubmit={handleSubmit}
          register={register} />
        {errorSubmit && <p className="text-red-500 font-light px-3.5 -mt-3 text-sm">{errorSubmit}</p>}
      </article>
      <aside className="lg:mt-8">
        <ProductsForm
          products={products}
          setProducts={setProducts}
          searchedProducts={searchedProducts}
          setSearchedProducts={setSearchedProducts}
        />
        {errorProducts && <p className="text-red-500 font-light px-3.5 mt-4 text-sm">{errorProducts}</p>}
      </aside>
    </section>
  )
}