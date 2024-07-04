import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../initializeApp"
import { ROUTES_COLLECTIONS } from "@/consts/db/db"
import { Product } from "@/types/db/db"

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, ROUTES_COLLECTIONS.PRODUCTS))
  const products: Product[] = []

  querySnapshot.forEach(doc => {
    products.push(doc.data() as Product)
  })

  return products
}

export const getProduct = async (id: string) => {
  const docRef = doc(db, ROUTES_COLLECTIONS.PRODUCTS, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data() as Product
  } else {
    return null
  }
}

export const saveProduct = async (product: Product) => {
  const docRef = doc(db, ROUTES_COLLECTIONS.PRODUCTS, product.id)
  await setDoc(docRef, product)
}

export const deleteProduct = async (id: string) => {
  const docRef = doc(db, ROUTES_COLLECTIONS.PRODUCTS, id)
  await deleteDoc(docRef)
}

export const updateProduct = async (product: Product) => {
  const docRef = doc(db, ROUTES_COLLECTIONS.PRODUCTS, product.id)
  await updateDoc(docRef, { ...product })
}