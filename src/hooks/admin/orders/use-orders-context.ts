import { ordersContext } from "@/contexts/admin/orders/orders-context"
import { useContext } from "react"

export const useOrdersContext = () => {
  const context = useContext(ordersContext)
  if (context === undefined) throw new Error('useOrdersContext must be used within a OrdersProvider')
  return context
}