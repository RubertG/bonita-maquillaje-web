"use client"

import { OrderCard } from "./order-card"
import { OrderSkeleton } from "./order-skeleton"
import { branch } from "@/fonts/branch/branch"
import { useOrders } from "@/hooks/admin/orders/use-orders"

interface Props {
  className?: string
}

export const OrdersContainer = ({
  className
}: Props) => {
  const {
    getMoreOrders, hasNext, loading,
    orders, setReload
  } = useOrders()

  if (!orders) return (
    <section className={`${className} text-center text-text-300`}>
      No se encontraron pedidos :(
    </section>
  )

  return (
    <section className={className}>
      <ul className={`${className} grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2`}>
        {
          (
            orders.filterOrders.map((order) => (
              <OrderCard
                key={order.id}
                setReload={setReload}
                {...order}
              />
            ))
          )
        }
        {
          loading && orders.filterOrders.length === 0 && (
            Array(6).fill(0).map((_, index) => (
              <OrderSkeleton key={index} />
            ))
          )
        }
      </ul>
      {
        hasNext && !loading && (
          <footer
            className="flex justify-end items-center mt-7"
          >
            <button
              className={`relative inline-flex items-center justify-center py-2 px-3.5 rounded-lg bg-accent-200 text-text-100 gap-2 text-center text-xl shadow-button lg:hover:bg-principal-100 lg:transition-colors ${branch.className}`}
              onClick={getMoreOrders}
            >
              Ver más pedidos
            </button>
          </footer>
        )
      }
    </section>
  )
}