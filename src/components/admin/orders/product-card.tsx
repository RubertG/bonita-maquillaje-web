"use client"

import { Delete, Plus } from "@/components/common/icons"
import { Product } from "@/types/admin/admin"
import { useEffect, useState } from "react"

interface Props {
  product: Product
  onClick: (product: Product) => void
  changeCount: (product: Product, count: number) => void
}

export const AddProductCard = ({
  onClick, product, changeCount
}: Props) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count === 0) return

  }, [count])

  return (
    <li className="flex w-full gap-2 items-center justify-between rounded-lg lg:p-2 lg:hover:bg-bg-100 lg:transition-colors">
      <div className="flex gap-2 items-center overflow-hidden">
        <img
          className="w-16 object-cover rounded-lg aspect-[3/4]"
          loading="lazy"
          src={product.imgs[0].url} alt={`${product.name} - Bonita Maquillaje`}
          title={`${product.name} - Bonita Maquillaje`} />
        <div className="flex flex-col items-start justify-start gap-1">
          <h3 className="lg:text-lg text-text-100 text-ellipsis overflow-hidden whitespace-nowrap"
            title={product.name}
          >
            {product.name}
          </h3>
          <div className="flex gap-3 items-center">
            <div className="flex bg-bg-50 rounded-lg shadow-button items-center justify-center">
              <button
                onClick={() => {
                  if (count === 0) return
                  setCount(count - 1)
                  changeCount(product, count - 1)
                }}
                className="py-4 px-3">
                <span className="w-3.5 h-[2px] bg-text-300 rounded-lg block" />
              </button>
              <p className="px-2 text-accent-300 text-lg">
                {count}
              </p>
              <button
                onClick={() => {
                  setCount(count + 1)
                  changeCount(product, count + 1)
                }}
                className="py-4 px-3">
                <span className="w-3.5 h-[2px] bg-text-300 rounded-lg block" />
                <span className="w-3.5 h-[2px] bg-text-300 rounded-lg block rotate-90 -translate-y-full" />
              </button>
            </div>
            <p
              className="text-accent-300"
              title={`$${product.price}`}
            >
              ${product.price}
            </p>
          </div>
        </div>
      </div>
      {
        count > 0 && (
          <button
            onClick={() => onClick(product)}
          >
            <Plus className="w-5 h-5 stroke-accent-300 lg:hover:scale-125 lg:transition-transform" />
          </button>
        )
      }
    </li>
  )
}

export const DeleteProductCard = ({
  onClick, product, changeCount
}: Props) => {
  const [count, setCount] = useState(product.amount)

  return (
    <li
      className="flex w-full gap-2 items-center justify-between rounded-lg lg:p-2 lg:hover:bg-bg-100 lg:transition-colors">
      <div className="flex gap-2 items-center overflow-hidden">
        <img
          className="w-16 object-cover rounded-lg aspect-[3/4]"
          loading="lazy"
          src={product.imgs[0].url} alt={`${product.name} - Bonita Maquillaje`}
          title={`${product.name} - Bonita Maquillaje`} />
        <div className="flex flex-col items-start justify-start gap-1">
          <h3 className="lg:text-lg text-text-100 text-ellipsis overflow-hidden whitespace-nowrap"
            title={product.name}
          >
            {product.name}
          </h3>
          <div className="flex gap-3 items-center">
            <div className="flex bg-bg-50 rounded-lg shadow-button items-center justify-center overflow-hidden">
              <button
                onClick={() => {
                  if (count === 1) return
                  setCount(count - 1)
                  changeCount(product, count - 1)
                }}
                className="py-4 px-3">
                <span className="w-3.5 h-[2px] bg-text-300 rounded-lg block" />
              </button>
              <p className="px-2 text-accent-300 text-lg">
                {count}
              </p>
              <button
                onClick={() => {
                  setCount(count + 1)
                  changeCount(product, count + 1)
                }}
                className="py-4 px-3">
                <span className="w-3.5 h-[2px] bg-text-300 rounded-lg block" />
                <span className="w-3.5 h-[2px] bg-text-300 rounded-lg block rotate-90 -translate-y-full" />
              </button>
            </div>
            <p
              className="text-accent-300"
              title={`$${product.price}`}
            >
              ${product.price}
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={() => onClick(product)}
      >
        <Delete className="w-5 h-5 stroke-text-200 lg:hover:scale-125 lg:transition-transform" />
      </button>
    </li>
  )
}