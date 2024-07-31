import { Order } from "@/types/db/db"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"

export const setStorage = (o: Order[], l: QueryDocumentSnapshot<DocumentData, DocumentData>, h: boolean, state: boolean = false) => {
  localStorage.setItem(state ? "sales" : "orders", JSON.stringify(o))
  localStorage.setItem(state ? "salesLastVisible" : "ordersLastVisible", JSON.stringify(l))
  localStorage.setItem(state ? "salesHasNext" : "ordersHasNext", JSON.stringify(h))
}

export const removeStorage = (state: boolean = false) => {
  localStorage.removeItem(state ? "sales" : "orders")
  localStorage.removeItem(state ? "salesLastVisible" : "ordersLastVisible")
  localStorage.removeItem(state ? "salesHasNext" : "ordersHasNext")
}