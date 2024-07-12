"use client"

import { FileStateItem } from "@/types/admin/admin"
import { UploadFile } from "../common/upload-file"
import { BaseSyntheticEvent, useEffect, useState } from "react"
import { Input, SelectInput, TextArea } from "@/components/common/input"
import { Button } from "@/components/common/button"
import { Save, Spinner } from "@/components/common/icons"
import { useForm } from "@/hooks/common/use-form"
import { productSchema } from "@/validations/admin/products/product-schema"
import { Category } from "@/types/db/db"
import { getCategories } from "@/firebase/services/categories"
import clsx from "clsx"

interface Inputs {
  name: string
  description: string
  price: string
  stock: string
  category: string
}

export const ProductForm = () => {
  const [imgs, setImgs] = useState<FileStateItem[]>([])
  const [categories, setCategories] = useState<Pick<Category, "name" | "id">[]>([])
  const [errorImgs, setErrorImgs] = useState("")
  const {
    register, handleSubmit, loading, errors
  } = useForm<Inputs>({
    schema: productSchema,
    actionSubmit: (data) => {
      console.log(data)
    }
  })

  useEffect(() => {
    const getC = async () => {
      const c = await getCategories()
      if (!c) return
      setCategories(c.map(category => ({
        name: category.name,
        id: category.id
      })))
    }
    getC()
  }, [])

  useEffect(() => {
    setErrorImgs("")
  }, [imgs])

  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    if (imgs.length === 0) {
      setErrorImgs("Se requiere cargar imagenes")
    }
    handleSubmit(e)
  }

  return (
    <section className="flex flex-col-reverse gap-4 max-w-lg mx-auto lg:grid lg:grid-cols-[55%_1fr] lg:gap-8 lg:max-w-none">
      <form onSubmit={onSubmit}>
        <label
          className="text-text-100 font-light mb-2 block"
          htmlFor="name">
          Nombre del producto <span className="text-accent-300">*</span>
        </label>
        <Input
          id="name"
          placeholder="Nombre del producto"
          {...register("name")}
        />
        {errors.name?.message && <p className="text-red-500 font-light px-3.5 mb-4 mt-2 text-sm">{errors.name?.message}</p>}

        <label
          className="text-text-100 font-light mb-2 block mt-4"
          htmlFor="category">
          Categoría <span className="text-accent-300">*</span>
        </label>
        <SelectInput
          title={categories.length === 0 ? "Cargando categorías..." : "Selecciona la categoría"}
          items={categories}
          id="category"
          placeholder="Categoría"
          {...register("category")}
        />
        {errors.category?.message && <p className="text-red-500 font-light px-3.5 mb-4 mt-2 text-sm">{errors.category?.message}</p>}

        <label
          className="text-text-100 font-light mb-2 block mt-4"
          htmlFor="description">
          Descripción <span className="text-accent-300">*</span>
        </label>
        <TextArea
          id="description"
          placeholder="Descripción"
          {...register("description")}
        />
        {errors.description?.message && <p className="text-red-500 font-light px-3.5 mb-4 mt-2 text-sm">{errors.description?.message}</p>}

        <label
          className="text-text-100 font-light mb-2 block mt-4"
          htmlFor="name">
          Precio del producto <span className="text-accent-300">*</span>
        </label>
        <Input
          type="number"
          min={0}
          id="price"
          placeholder="0"
          {...register("price")}
        />
        {errors.price?.message && <p className="text-red-500 font-light px-3.5 mb-4 mt-2 text-sm">{errors.price?.message}</p>}

        <label
          className="text-text-100 font-light mb-2 block mt-4"
          htmlFor="name">
          Cantidad del producto <span className="text-accent-300">*</span>
        </label>
        <Input
          type="number"
          id="stock"
          min={0}
          placeholder="0"
          {...register("stock")}
        />
        {errors.stock?.message && <p className="text-red-500 font-light px-3.5 mb-4 mt-2 text-sm">{errors.stock?.message}</p>}

        <Button
          className="w-full my-6"
        >
          <Save className="absolute top-1/2 -translate-y-1/2 left-0 ml-3.5 stroke-text-100" />
          <Spinner className={clsx("w-5 h-5 absolute opacity-0 transition-opacity", { "opacity-100": loading })} />
          <p className={clsx("transition-opacity", { "opacity-0": loading })}>Guardar producto</p>
        </Button>
      </form>
      <aside>
        <UploadFile
          items={imgs}
          setItems={setImgs} />
        {(errorImgs) && <p className="text-red-500 font-light px-3.5 -mt-5 text-sm">{errorImgs}</p>}
      </aside>
    </section>
  )
}