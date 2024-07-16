"use client"

import { Delete, Edit } from "@/components/common/icons"
import { Order } from "@/types/db/db"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PopupDelete } from "../common/popup-delete"
import { deleteOrder } from "@/firebase/services/orders"
import Link from "next/link"

export const OptionsOrderCard = ({ id }: Pick<Order, "id">) => {
  const [popup, setPopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setLoading(true)
    await deleteOrder(id)
    router.refresh()
    setLoading(false)
    setPopup(false)
  }

  const handlePopup = () => setPopup(!popup)

  return (
    <div className="flex flex-col gap-2">
      <Link
        title="Editar pedido"
        href={`/admin/productos/editar-pedido/${id}`}
      >
        <Edit className="stroke-principal-200 lg:hover:scale-110 lg:transition-transform" />
      </Link>
      <button
        title="Eliminar pedido"
        onClick={handlePopup}
      >
        <Delete className="stroke-text-300 lg:hover:scale-110 lg:transition-transform" />
      </button>
      {
        popup && (
          <PopupDelete
            title="¿Deseas eliminar esta pedido?"
            handleDelete={handleDelete}
            loading={loading}
            handlePopup={handlePopup}
          />
        )
      }
    </div>
  )
}