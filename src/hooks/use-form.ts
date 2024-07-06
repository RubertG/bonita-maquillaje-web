"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm as useFormReactHook } from "react-hook-form"
import { z } from "zod"

export function useForm<Inputs extends FieldValues = FieldValues, TypeSchema extends z.ZodType = z.ZodType<Inputs>>({
  schema,
  actionSubmit
} : {
  schema: TypeSchema
  actionSubmit: (data: Inputs) => void
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useFormReactHook<Inputs>({
    resolver: zodResolver(schema)
  })
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    actionSubmit(data)
    setLoading(false)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setError,
    errors,
    loading,
    onSubmit
  }
}