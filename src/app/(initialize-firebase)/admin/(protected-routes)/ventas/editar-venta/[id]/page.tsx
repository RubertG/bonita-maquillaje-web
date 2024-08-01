import { EditSaleForm } from "@/components/admin/sales/edit-sale-form"
import { BackButton } from "@/components/common/back-button"
import { H1 } from "@/components/common/h1"

export default function EditSalePage({
  params: { id }
}: {
  params: { id: string }
}) {
  return (
    <main className="px-4 my-16 xl:px-0 lg:mt-20 max-w-5xl mx-auto">
      <BackButton href="/admin/ventas" />
      <H1 className="mb-6 mt-2">Editar venta</H1>
      <EditSaleForm id={id} />
    </main>
  )
}