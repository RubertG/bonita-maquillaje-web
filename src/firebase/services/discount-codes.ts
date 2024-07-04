import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { db } from "../initializeApp"
import { DiscountCode, Id } from "@/types/db/db"
import { ROUTES_COLLECTIONS } from "@/consts/db/db"

export const getDiscountCodes = async () => {
  const querySnapshot = await getDocs(collection(db, ROUTES_COLLECTIONS.DISCOUNT_CODES))
  const discountCodes: DiscountCode[] = []

  querySnapshot.forEach(doc => {
    discountCodes.push(doc.data() as DiscountCode)
  })

  return discountCodes
}

export const getDiscountCode = async (code: string) => {
  const collectionRef = collection(db, ROUTES_COLLECTIONS.DISCOUNT_CODES)
  const q = query(collectionRef, where('name', '==', code))
  const querySnapshot = await getDocs(q)
  const results: DiscountCode[] = []

  querySnapshot.forEach(doc => {
    results.push(doc.data() as DiscountCode)
  })

  return results.length > 0 ? results[0] : null
}

export const saveDiscountCode = async (discountCode: DiscountCode) => {
  const docRef = doc(db, ROUTES_COLLECTIONS.DISCOUNT_CODES, discountCode.code)
  await setDoc(docRef, discountCode)
}

export const deleteDiscountCode = async (id: Id) => {
  const docRef = doc(db, ROUTES_COLLECTIONS.DISCOUNT_CODES, id)
  await deleteDoc(docRef)
}