"use client"

import { getAllProducts } from "@/firebase/services/products"
import { Product } from "@/types/admin/admin"
import { useEffect, useState } from "react"
import { ProductsContainer } from "./products-container"
import { DeleteProductCard } from "./product-card"
import clsx from "clsx"
import { ProductsSummary } from "../../common/products-summary"
import { SearcherClient } from "@/components/common/searcher"
import { Tone } from "@/types/db/db"

interface Props {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  setSearchedProducts: React.Dispatch<React.SetStateAction<{
    original: Product[]
    filtered: Product[]
  }>>
  searchedProducts: {
    original: Product[]
    filtered: Product[]
  }
  className?: string
}

export const ProductsForm = ({
  products,
  setProducts,
  setSearchedProducts,
  searchedProducts,
  className
}: Props) => {
  const [search, setSearch] = useState<string | undefined>()

  useEffect(() => {
    if (search && search !== "") {
      if (searchedProducts.original.length === 0) {
        getP()
        return
      }

      const originalAux = JSON.parse(JSON.stringify(searchedProducts.original)) as Product[]
      setSearchedProducts({
        original: searchedProducts.original,
        filtered: originalAux.filter((product) => {
          return product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        })
      })
      return
    }

    if (searchedProducts.original.length === 0) {
      getP()
      return
    }

    if (searchedProducts.filtered.length !== 0 && !search) {
      setSearchedProducts({
        original: searchedProducts.original,
        filtered: []
      })
      return
    }

    setSearchedProducts({
      original: searchedProducts.original,
      filtered: JSON.parse(JSON.stringify(searchedProducts.original)) as Product[]
    })
  }, [search])

  useEffect(() => {
    setSearch("")
  }, [products])

  const getP = async () => {
    const p = await getAllProducts(search || "")
    const parseProducts: Product[] = p.map((p) => ({
      ...p,
      amount: 0
    }))
    setSearchedProducts({
      original: parseProducts,
      filtered: search ? parseProducts : []
    })
  }

  const handleSelectProduct = (product: Product) => {
    setProducts([...products, product])
    setSearchedProducts({
      ...searchedProducts,
      filtered: []
    })
  }

  const handleDeleteProduct = (product: Product) => {
    setProducts(products.filter((p) => p.id !== product.id))
    setSearchedProducts({
      ...searchedProducts,
      filtered: []
    })
  }

  const handleChangeCountFilters = (product: Product, count: number) => {
    const newProducts = searchedProducts.filtered.map((p) => {
      if (p.id === product.id) {
        return {
          ...p,
          amount: count
        }
      }
      return p
    })
    setSearchedProducts({
      ...searchedProducts,
      filtered: newProducts
    })
  }

  const handleSelectTone = (product: Product, tone: Tone) => {
    const newProducts = searchedProducts.filtered.map((p) => {
      if (p.id === product.id) {
        return {
          ...p,
          tone: tone
        }
      }
      return p
    })
    setSearchedProducts({
      ...searchedProducts,
      filtered: newProducts
    })
  }

  const handleChangeCount = (product: Product, count: number) => {
    const newProducts = products.map((p) => {
      if (p.id === product.id) {
        return {
          ...p,
          amount: count
        }
      }
      return p
    })
    setProducts(newProducts)
  }

  return (
    <>
      <SearcherClient
        search={search || ""}
        setSearch={setSearch}
        placeholder="Buscar producto a agregar..."
      />
      <section className={`relative ${className}`}>
        {
          search && (
            <ProductsContainer
              className={clsx(`absolute w-full top-0 left-0 z-30 ${className}`, {
                "mt-4": products.length === 0,
                "": products.length !== 0
              })}
              handleSelectTone={handleSelectTone}
              changeCount={handleChangeCountFilters}
              searchedProducts={searchedProducts.filtered}
              handleSelectProduct={handleSelectProduct} />
          )
        }
        {
          products.length > 0 && (
            <ul className="flex flex-col gap-3 md:gap-0 mt-4">
              {
                products.map((product) => (
                  <DeleteProductCard
                    key={product.id}
                    changeCount={handleChangeCount}
                    onClick={handleDeleteProduct}
                    product={product}
                  />
                ))
              }
            </ul>
          )
        }
        {
          products.length > 0 && (
            <ProductsSummary
              className="mt-4"
              products={products} />
          )
        }
      </section>
    </>
  )
}