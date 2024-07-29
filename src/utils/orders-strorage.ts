import { Order } from "@/types/db/db"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"

export const setStorage = (o: Order[], l: QueryDocumentSnapshot<DocumentData, DocumentData>, h: boolean) => {
  localStorage.setItem("orders", JSON.stringify(o))
  localStorage.setItem("lastVisible", JSON.stringify(l))
  localStorage.setItem("hasNext", JSON.stringify(h))
}

export const removeStorage = () => {
  localStorage.removeItem("orders")
  localStorage.removeItem("lastVisible")
  localStorage.removeItem("hasNext")
  localStorage.removeItem("reload")
}