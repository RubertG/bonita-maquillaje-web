import { getProduct } from "@/firebase/services/products"
import { ItemCart } from "@/types/catalogue/cart"

export const setCart = (item: ItemCart) => {
  const cartLocal = localStorage.getItem('cart')

  if (!cartLocal) {
    localStorage.setItem('cart', JSON.stringify([item]))
    return 
  }

  const parseCart = JSON.parse(cartLocal) as ItemCart[]

  if (parseCart.find(it => it.id === item.id)) return
  
  const newCart = [...parseCart, item]
  localStorage.setItem('cart', JSON.stringify(newCart))
}

export const getCart = async () => {
  const cart = localStorage.getItem('cart')

  if (!cart) return []

  const parseCart = JSON.parse(cart) as ItemCart[]
  const productsCart = await Promise.all(parseCart.map(async (item) => {
    const product = await getProduct(item.id)

    if (!product) return null

    return {
      ...product,
      amount: item.amount
    }
  }))

  return productsCart.filter(product => product !== null)
}