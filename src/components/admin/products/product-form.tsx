"use client"

import { FileStatusItem } from "@/types/admin/admin"
import { UploadFile } from "../common/upload-file"
import { Suspense, useState } from "react"
import { Input, SelectInput, TextArea } from "@/components/common/input"
import { SelectCategory } from "./select-category"
import { Button } from "@/components/common/button"
import { Save } from "@/components/common/icons"

export const ProductForm = () => {
  const [items, setItems] = useState<FileStatusItem[]>([])

  return (
    <section>
      <UploadFile
        items={items}
        setItems={setItems} />
      <form action="">
        <label
          className="text-text-100 font-light mb-2 block"
          htmlFor="name">
          Nombre del producto <span className="text-accent-300">*</span>
        </label>
        <Input
          id="name"
          name="name"
          placeholder="Nombre del producto" />

        <label
          className="text-text-100 font-light mb-2 block mt-4"
          htmlFor="category">
          Categoría <span className="text-accent-300">*</span>
        </label>
        <Suspense fallback={<SelectInput title="Cargando categorias..." />}>
          <SelectCategory />
        </Suspense>

        <label
          className="text-text-100 font-light mb-2 block mt-4"
          htmlFor="description">
          Descripción <span className="text-accent-300">*</span>
        </label>
        <TextArea id="description" name="description" placeholder="Descripción" />

        <label
          className="text-text-100 font-light mb-2 block mt-4"
          htmlFor="name">
          Precio del producto <span className="text-accent-300">*</span>
        </label>
        <Input
          type="number"
          id="price"
          name="price"
          placeholder="0" />

        <label
          className="text-text-100 font-light mb-2 block mt-4"
          htmlFor="name">
          Cantidad del producto <span className="text-accent-300">*</span>
        </label>
        <Input
          type="number"
          id="stock"
          name="stock"
          placeholder="0" />

          <Button
            className="w-full my-6"
          >
            <Save className="absolute top-1/2 -translate-y-1/2 left-0 ml-3.5 stroke-text-100" />
            Guardar producto
          </Button>
      </form>
    </section>
  )
}