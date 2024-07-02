/* export interface Users {
  id: string
  name: string
  email: string
  number: number
} */

export interface Tone {
  color: string
  name: string
}

export interface Category {
  id: string
  name: string
  img: string
}

export interface Products {
  id: string
  name: string
  price: number
  description: string
  stock: number
  tone: Tone[]
  imgs: string[]
  category: Pick<Category, 'id'>
}

export interface Order {
  id: string
  name: string
  email: string
  phone: number
  department: string
  city: string
  address: string
  products: Array<Pick<Products, 'id'>>
}

export interface DiscountCode {
  id: string
  code: string
  discount: number
  expiration: Date
}