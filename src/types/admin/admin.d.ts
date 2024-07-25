import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
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

export interface OrdersManagementStorage {
  orders: Order[] | undefined
  loading: boolean
  lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData>
  hasNext: boolean
}