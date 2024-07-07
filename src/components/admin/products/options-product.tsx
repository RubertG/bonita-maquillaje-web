"use client"

import { Delete, Edit } from "@/components/common/icons"
import { deleteProduct } from "@/firebase/services/products"
import { Product } from "@/types/db/db"

export const OptionsProduct = ({ id }: Pick<Product, "id">) => {

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => { console.log(id) }}
      >
        <Edit className="stroke-principal-200 lg:hover:scale-110 lg:transition-transform" />
      </button>
      <button
        onClick={() => { console.log(id) }}
      >
        <Delete className="stroke-text-300 lg:hover:scale-110 lg:transition-transform" />
      </button>
    </div>
  )
}