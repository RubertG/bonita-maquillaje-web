import { ImgsContainer } from "@/components/catalogue/imgs-container"
import { BackButton } from "@/components/common/back-button"
import { getProduct } from "@/firebase/services/products"
import { notFound } from "next/navigation"

export default async function ProductPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const products = await getProduct(id)

  if (!products) return notFound()

  return (
    <main
      className="px-4 my-16 xl:px-0 lg:mt-20 max-w-5xl mx-auto"
    >
      <section className="flex items-center gap-3 justify-between">
        <BackButton href="/catalogo" />
        <p className="text-accent-300 text-xl">${products.price}</p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4 mt-6">
        <ImgsContainer imgs={products.imgs} />
        <aside>
          LAKnsdnasasjknd
        </aside>
      </section>
    </main>
  )
}