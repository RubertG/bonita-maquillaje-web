"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search } from "./icons"
import { FormEvent } from "react"

export const Searcher = ({
  className, placeholder
}: {
  className?: string,
  placeholder?: string
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const searchValue = data.get("search")
    const categoriaValue = searchParams.get("categoria")

    const url = new URLSearchParams({
      ...((searchValue) && { busqueda: searchValue.toString() }),
      ...((categoriaValue) && { categoria: categoriaValue })
    })

    router.replace(`${pathname}?${url.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center justify-between w-full bg-bg-50 rounded-lg pr-2.5 gap-1.5 shadow-button ${className} max-w-2xl mx-auto`}>
      <input
        className="w-full rounded-lg pl-3.5 py-2.5 focus:outline-none text-text-200 font-light placeholder:text-gray-400"
        placeholder={placeholder ? placeholder : "Busca el producto que quieres..."}
        name="search"
        autoComplete="off"
        defaultValue={searchParams.get("search") || ""}
        type="text" />
      <button
        type="submit">
        <Search className="stroke-text-200 w-8" />
      </button>
    </form>
  )
}