import { Order } from "@/types/db/db"
import { OptionsOrderCard } from "./options-order-card"

interface Props extends Order { }

export const OrderCard = ({ name, create_at, id }: Props) => {

  return (
    <li
      className="flex w-full gap-2 items-start rounded-lg justify-between lg:p-2 lg:hover:bg-bg-200 lg:transition-colors"
    >
      <div className="overflow-hidden flex flex-col justify-center h-full">
        <h3 className="text-text-100 text-ellipsis overflow-hidden whitespace-nowrap"
          title={name}
        >
          {name}
        </h3>
        <p className="text-sm font-light text-text-200">
          {create_at.toDate().toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </p>
      </div>
      <OptionsOrderCard id={id} />
    </li>
  )
}