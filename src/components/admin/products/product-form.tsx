"use client"

import { UploadFile } from "../common/upload-file"
import { Input, SelectInput, TextArea } from "@/components/common/input"
import { Button } from "@/components/common/button"
import { Save, Spinner } from "@/components/common/icons"
import clsx from "clsx"
import { AddTone } from "./add-tone"
import { useProductForm } from "@/hooks/admin/useProductForm"

export const ProductForm = () => {
  const { categories, error, errorImgs, errors, imgs, setImgs, register, loading, setTones, tones, onSubmit } = useProductForm()

  return (
    <section className="flex flex-col-reverse gap-4 max-w-lg mx-auto lg:grid lg:grid-cols-[55%_1fr] lg:gap-8 lg:max-w-none">
      <form onSubmit={onSubmit}>
        <label
          className="text-text-100 mb-2 block"
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
          className="text-text-100 mb-2 block mt-5"
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
          className="text-text-100 mb-2 block mt-5"
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
          className="text-text-100 mb-2 block mt-5"
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
          className="text-text-100 mb-2 block mt-5"
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

        <AddTone
          setTones={setTones}
          tones={tones}
          className="mt-5 mb-1"
        />

        <Button
          className="w-full my-6"
        >
          <Save className="absolute top-1/2 -translate-y-1/2 left-0 ml-3.5 stroke-text-100" />
          <Spinner className={clsx("w-5 h-5 absolute opacity-0 transition-opacity", { "opacity-100": loading })} />
          <p className={clsx("transition-opacity", { "opacity-0": loading })}>Guardar producto</p>
        </Button>
        {error && <p className="text-red-500 font-light px-3.5 -mt-3 text-sm">{error}</p>}
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