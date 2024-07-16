"use client"

import { LIMIT_ORDERS_PER_PAGE } from "@/consts/admin/orders"
import { getFirstOrders, getNextOrders } from "@/firebase/services/orders"
import { Order } from "@/types/db/db"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { OrderCard } from "./order-card"
import { OrderSkeleton } from "./order-skeleton"
import { branch } from "@/fonts/branch/branch"

interface Props {
  className?: string
}

export const OrdersContainer = ({
  className
}: Props) => {
  const [orders, setOrders] = useState<Order[] | undefined>([])
  const [loading, setLoading] = useState(true)
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>>()
  const [hasNext, setHasNext] = useState(true)

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true)
      const { orders: o, lastVisible: l } = await getFirstOrders()

      if (!orders) {
        setOrders(undefined)
      } else {
        setOrders(o)
      }

      setLastVisible(l)
      setHasNext(o.length === LIMIT_ORDERS_PER_PAGE)
      setLoading(false)
    }
    getOrders()
  }, [])

  if (!orders) return (
    <section className={`${className} text-center text-text-300`}>
      No se encontraron pedidos :(
    </section>
  )

  const getMoreOrders = async () => {
    if (!lastVisible) return

    setLoading(true)
    const { orders: o, lastVisible: l } = await getNextOrders(lastVisible)

    if (!orders) {
      setOrders(undefined)
    }

    setOrders([...orders, ...o])
    setLastVisible(l)
    setHasNext(o.length === LIMIT_ORDERS_PER_PAGE)
    setLoading(false)
  }

  return (
    <section className={className}>
      <ul className={`${className} grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2`}>
        {
          orders.map((order) => (
            <OrderCard
              key={order.id}
              {...order}
            />
          ))
        }
        {
          loading && (
            Array(LIMIT_ORDERS_PER_PAGE).fill(0).map((_, index) => (
              <OrderSkeleton key={index} />
            ))
          )
        }
      </ul>
      {
        hasNext && (
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