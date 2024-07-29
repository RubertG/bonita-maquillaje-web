"use client"

import { LIMIT_ORDERS_PER_PAGE } from "@/consts/admin/orders"
import { getFirstOrders, getNextOrders, getOrdersSearch } from "@/firebase/services/orders"
import { useEffect, useState } from "react"
import { OrderCard } from "./order-card"
import { OrderSkeleton } from "./order-skeleton"
import { branch } from "@/fonts/branch/branch"
import { useSearchParams } from "next/navigation"
import { Order } from "@/types/db/db"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { removeStorage, setStorage } from "@/utils/orders-strorage"

interface Props {
  className?: string
}

export const OrdersContainer = ({
  className
}: Props) => {
  const [orders, setOrders] = useState<Order[] | undefined>(() => {
    const orders = localStorage.getItem("orders")
    if (!orders) return []
    return JSON.parse(orders)
  })
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData, DocumentData> | undefined>(() => {
    const lastVisible = localStorage.getItem("lastVisible")
    if (!lastVisible) return undefined
    return JSON.parse(lastVisible)
  })
  const [hasNext, setHasNext] = useState(() => {
    const hasNext = localStorage.getItem("hasNext")
    if (!hasNext) return false
    return JSON.parse(hasNext)
  })
  const [loading, setLoading] = useState(false)
  const [reload, setReload] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (reload) {
      getOrders()
      setReload(false)
    }
  }, [reload])

  useEffect(() => {
    window.addEventListener('beforeunload', removeStorage)

    return () => {
      window.removeEventListener('beforeunload', removeStorage)
    }
  }, [])

  useEffect(() => {
    const search = searchParams.get("busqueda")

    if (!search) {
      if (orders && orders.length > 0) return
      getOrders()
      return
    }

    const handleSearch = async () => {
      setLoading(true)
      const { orders: o } = await getOrdersSearch(search)

      if (!o) {
        setOrders(undefined)
      } else {
        setOrders(o)
      }

      removeStorage()
      setLastVisible(undefined)
      setHasNext(false)
      setLoading(false)
    }

    handleSearch()
  }, [searchParams.get("busqueda")])

  const getOrders = async () => {
    if (orders && orders.length > 0 && searchParams.get("busqueda")) return

    setLoading(true)
    const { orders: o, lastVisible: l } = await getFirstOrders()

    if (!o) {
      setOrders(undefined)
    } else {
      setOrders(o)
    }

    const h = o.length === LIMIT_ORDERS_PER_PAGE
    setStorage(o, l, h)
    setLastVisible(l)
    setHasNext(h)
    setLoading(false)
  }

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

    const h = o.length === LIMIT_ORDERS_PER_PAGE
    const newOrders = [...orders, ...o]
    setOrders(newOrders)
    setLastVisible(l)
    setHasNext(h)
    setLoading(false)
  }

  return (
    <section className={className}>
      <ul className={`${className} grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2`}>
        {
          (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                setReload={setReload}
                {...order}
              />
            ))
          )
        }
        {
          loading && orders.length === 0 && (
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