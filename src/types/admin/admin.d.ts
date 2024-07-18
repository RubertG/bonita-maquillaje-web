import { Params } from "next/dist/shared/lib/router/utils/route-matcher"

export interface FileStateItem {
  name: string
  url: string
  size: number
}

export interface CategoryInputs {
  name: string
}

export interface Inputs {
  name: string
  description: string
  price: string
  stock: string
  category: string
}

export interface ProductsContext {
  products: Product[]
  refreshProducts: (category: string) => Promise<void>
  loading: boolean
  searchParams: Params
}