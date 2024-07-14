"use client"

import { Delete, Edit } from "@/components/common/icons"
import { deleteProduct } from "@/firebase/services/products"
import { deleteFile } from "@/firebase/services/storage"
import { Product } from "@/types/db/db"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PopupDelete } from "../common/popup-delete"

export const OptionsProduct = ({ id, imgs }: Pick<Product, "id" | "imgs">) => {
  const [popup, setPopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setLoading(true)
    await Promise.all(imgs.map(img => deleteFile(`products/${img.name}`)))
    await deleteProduct(id)
    router.refresh()
    setLoading(false)
    setPopup(false)
  }

  const handlePopup = () => setPopup(!popup)

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => router.push(`/admin/productos/editar-producto/${id}`)}
      >
        <Edit className="stroke-principal-200 lg:hover:scale-110 lg:transition-transform" />
      </button>
      <button
        onClick={handlePopup}
      >
        <Delete className="stroke-text-300 lg:hover:scale-110 lg:transition-transform" />
      </button>
      {
        popup && (
          <PopupDelete
            title="¿Deseas eliminar este producto?"
            handleDelete={handleDelete}
            loading={loading}
            handlePopup={handlePopup}
          />
        )
      }
    </div>
  )
}