"use client"

import { useRouter } from "next/navigation"
import { BaseSyntheticEvent, useEffect, useState } from "react"
import { useForm } from "../common/use-form"
import { categorySchema } from "@/validations/admin/products/category"
import { saveFile } from "@/firebase/services/storage"
import { v4 as uuidv4 } from "uuid"
import { saveCategory } from "@/firebase/services/categories"

interface Inputs {
  name: string
}

export const useCategoryForm = () => {
  const [imgs, setImgs] = useState<File[]>([])
  const [errorImgs, setErrorImgs] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { errors, handleSubmit, loading, register } = useForm<Inputs>({
    schema: categorySchema,
    actionSubmit: async (data) => {
      if (imgs.length === 0) return
      try {
        const imgRef = await saveFile(imgs[0], "/categories")

        const category = {
          name: data.name,
          id: uuidv4(),
          img: imgRef
        }

        await saveCategory(category)
        router.push("/admin/productos")
        router.refresh()
      } catch (error) {
        setError("Ocurrio un error al cargar la categoría")
      }
    }
  })

  useEffect(() => {
    if (imgs.length > 0) setErrorImgs("")
  }, [imgs])

  const onSubmit = async (e: BaseSyntheticEvent) => {
    if (imgs.length === 0) {
      setErrorImgs("Se requiere cargar imagenes")
    }
    await handleSubmit(e)
  }

  return {
    error,
    errorImgs,
    errors,
    imgs,
    loading,
    onSubmit,
    register,
    setImgs
  }
}
