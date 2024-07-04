import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../initializeApp"
import { ROUTES_COLLECTIONS } from "@/consts/db/db"
import { Order } from "@/types/db/db"

export const getOrders = async () => {
  const querySnapshot = await getDocs(collection(db, ROUTES_COLLECTIONS.ORDERS))
  const orders: Order[] = []

  querySnapshot.forEach(doc => {
    orders.push(doc.data() as Order)
  })

  return orders
}

export const getOrder = async (id: string) => {
  const docRef = doc(db, ROUTES_COLLECTIONS.ORDERS, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data() as Order
  } else {
    return null
  }
}

export const saveOrder = async (order: Order) => {
  const docRef = doc(db, ROUTES_COLLECTIONS.ORDERS, order.id)
  await setDoc(docRef, order)
}

export const deleteOrder = async (id: string) => {
  const docRef = doc(db, ROUTES_COLLECTIONS.ORDERS, id)
  await deleteDoc(docRef)
}

export const updateOrder = async (order: Order) => {
  const docRef = doc(db, ROUTES_COLLECTIONS.ORDERS, order.id)
  await updateDoc(docRef, { ...order })
}