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

export interface Products {
  id: Id
  name: string
  price: number
  description: string
  stock: number
  tone: Tone[]
  imgs: string[]
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

export interface DiscountCodes {
  id: Id
  code: string
  discount: number
  expiration: Date
}