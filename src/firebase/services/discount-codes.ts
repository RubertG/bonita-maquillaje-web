import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { db } from "../initializeApp"
import { DiscountCodes } from "@/types/db/db"
import { ROUTES_COLLECTIONS } from "@/consts/db/db"

export const getDiscountCodes = async () => {
  const querySnapshot = await getDocs(collection(db, ROUTES_COLLECTIONS.DISCOUNT_CODES))
  const discountCodes: DiscountCodes[] = []

  querySnapshot.forEach(doc => {
    discountCodes.push(doc.data() as DiscountCodes)
  })

  return discountCodes
}

export const getDiscountCode = async (code: string) => {
  const docRef = doc(db, ROUTES_COLLECTIONS.DISCOUNT_CODES, code)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data() as DiscountCodes
  } else {
    return null
  }
}

export const saveDiscountCode = async (discountCode: DiscountCodes) => {
  const docRef = doc(db, ROUTES_COLLECTIONS.DISCOUNT_CODES, discountCode.code)
  await setDoc(docRef, discountCode)
}