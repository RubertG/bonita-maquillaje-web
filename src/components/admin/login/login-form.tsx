"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema } from "@/validations/admin/login/user-schema"
import { branch } from "@/fonts/branch/branch"
import { Input, PasswordInput } from "@/components/common/input"
import { signIn } from "@/firebase/services/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Spinner } from "@/components/common/icons"
import clsx from "clsx"

interface Inputs {
  email: string
  password: string
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(userSchema)
  })
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    const { error } = await signIn(data.email, data.password)
    if (!error) {
      router.push("/admin/productos")
      setLoading(false)
    } else {
      setError("password", { message: "Usuario o contraseña incorrecta" })
      setLoading(false)
    }
  }

  return (
    <form
      className="w-full max-w-md shadow-button rounded-lg py-8 px-4"
      onSubmit={handleSubmit(onSubmit)}>
      <h1
        className={`text-4xl ${branch.className} text-center mb-7`}
      >Iniciar sesión</h1>
      <Input
        type="text"
        placeholder="Correo electrónico"
        className="mb-3"
        {...register("email")} />
      {errors.email?.message && <p className="text-red-500 font-light px-3.5 mb-4 -mt-1 text-sm">{errors.email?.message}</p>}
      <PasswordInput
        placeholder="Contraseña"
        className="mb-3"
        {...register("password")} />
      {errors.password?.message && <p className="text-red-500 font-light px-3.5 -mt-1 text-sm">{errors.password?.message}</p>}
      <button
        className={`w-full mt-5 bg-accent-200 text-text-100 py-2.5 px-3.5 rounded-lg text-xl shadow-button lg:hover:bg-accent-100 lg:transition-colors ${branch.className} flex items-center justify-center`}
        type="submit">
        <Spinner className={clsx("w-5 h-5 absolute opacity-0 transition-opacity", { "opacity-100": loading })} /> 
        <p className={clsx("transition-opacity", { "opacity-0": loading })}>Ingresar</p>
      </button>
    </form>
  )
}