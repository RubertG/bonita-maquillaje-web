"use client"

import { UploadFile } from "../common/upload-file"
import { LIMIT_FILE_SIZE } from "@/consts/admin/admin"
import { Button } from "@/components/common/button"
import { Save, Spinner } from "@/components/common/icons"
import clsx from "clsx"
import { useCategoryForm } from "@/hooks/admin/useCategoryForm"

export const CategoryForm = () => {
  const {
    error, errorImgs, errors, imgs, loading, onSubmit, register, setImgs
  } = useCategoryForm()

  return (
    <section className="max-w-xl mx-auto">
      <UploadFile
        aspect="1/1"
        limitSize={LIMIT_FILE_SIZE}
        className="mt-5"
        classNameError="-mt-1 mb-5"
        multiple={false}
        items={imgs}
        setItems={setImgs} />
      {(errorImgs) && <p className="text-red-500 font-light px-3.5 -mt-5 mb-4 text-sm">{errorImgs}</p>}

      <form
        onSubmit={onSubmit}
      >
        <label
          className="text-text-100 mb-2 block"
          htmlFor="name">
          Nombre de la categoría <span className="text-accent-300">*</span>
        </label>
        <input
          type="text"
          placeholder="Categoría"
          className="w-full rounded-lg px-3.5 py-2.5 focus:outline-bg-200 bg-bg-50 text-text-200 font-light placeholder:text-gray-400 shadow-button"
          {...register("name")}
        />
        {errors.name?.message && <p className="text-red-500 font-light px-3.5 mb-4 mt-2 text-sm">{errors.name?.message}</p>}

        <Button
          className="w-full my-5"
        >
          <Save className="absolute top-1/2 -translate-y-1/2 left-0 ml-3.5 stroke-text-100" />
          <Spinner className={clsx("w-5 h-5 absolute opacity-0 transition-opacity", { "opacity-100": loading })} />
          <p className={clsx("transition-opacity", { "opacity-0": loading })}>Guardar categoría</p>
        </Button>
        {(error) && <p className="text-red-500 font-light px-3.5 mt-5 text-sm">{error}</p>}
      </form>
    </section>
  )
}