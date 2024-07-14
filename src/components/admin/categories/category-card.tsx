"use client"

import { Delete } from "@/components/common/icons"
import { deleteCategory } from "@/firebase/services/categories"
import { Category as CategoryType } from "@/types/db/db"
import clsx from "clsx"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { PopupDelete } from "../common/popup-delete"

export const CategoryCard = ({ category: { id, name, img } }: { category: CategoryType }) => {
  const searchParams = useSearchParams()
  const [popup, setPopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const isActive = searchParams.get("categoria") === id

  const handleDelete = async () => {
    setLoading(true)
    await deleteCategory(id)
    router.refresh()
    setLoading(false)
    setPopup(false)
  }

  const handlePopup = () => setPopup(!popup)

  return (
    <article
      className={clsx("relative flex flex-col p-2 rounded-lg lg:hover:bg-bg-200 transition-colors cursor-pointer", {
        "bg-bg-200": isActive
      })}
      onClick={handlePopup}
      key={id}>
      <div className="absolute w-full h-full top-0 left-0 hidden opacity-0 lg:block lg:hover:bg-bg-50 lg:hover:bg-opacity-60 lg:hover:backdrop-blur-sm lg:transition-all lg:hover:opacity-100">
        <div className="flex justify-center items-center h-full">
          <Delete className="stroke-text-200 w-5.5 h-5.5" />
        </div>
      </div>
      <Link
        href={`?categoria=${id}`}
      >
        <img
          src={img}
          className="w-14 h-14 object-cover m-auto mb-1 aspect-square rounded-lg"
          title={`${name} - Bonita Maquillaje`}
          loading="lazy"
          alt={`${name} - Bonita Maquillaje`} />
        <h2
          className="text-sm text-accent-300 text-center font-light whitespace-nowrap"
        >{name}</h2>
      </Link>
      {popup && (
        <PopupDelete
          title="¿Deseas eliminar esta categoría?"
          loading={loading}
          handleDelete={handleDelete}
          handlePopup={handlePopup}
        />
      )}
    </article>
  )
}