import { FileStateItem } from "../admin/admin"

export type Id = string

export interface Tone {
  color: string
  name: string
}

export interface Category {
  id: Id
  name: string
  img: string
}

export interface Product {
  id: Id
  name: string
  price: number
  description: string
  stock: number
  tones: Tone[]
  imgs: FileStateItem[]
  category: Id
}

export interface Order {
  id: Id
  name: string
  email: string
  phone: number
  department: string
  city: string
  address: string
  products: Array<Id>
}

export interface DiscountCode {
  id: Id
  code: string
  discount: number
  expiration: Date
}