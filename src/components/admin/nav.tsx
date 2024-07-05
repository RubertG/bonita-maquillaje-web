'use client'

import { branch } from "@/fonts/branch/branch"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav
      className="bg-bg-transparent backdrop-blur-sm px-4 py-2.5 fixed w-full top-0 left-0"
    >
      <nav>
        <div
          className="flex items-center justify-between">
          <div>
            <img
              src="/logo-2.webp"
              alt="Logo de Bonita Maquillaje"
              className="h-11 object-cover inline-block" />
            <h1
              className={`inline-block ml-1 text-xl ${branch.className}`} >
              Bonita maquillaje
            </h1>
          </div>
          <button
            className="flex justify-between items-center gap-[3px] flex-col"
            onClick={() => setOpen(!open)}
          >
            <span className={clsx("h-[2px] w-5 bg-text-100 rounded-lg transition-transform", {
              "translate-y-[5px] -rotate-45": open
            })}></span>
            <span className={clsx("h-[2px] w-5 bg-text-100 rounded-lg transition-transform", {
              "opacity-0": open
            })}></span>
            <span className={clsx("h-[2px] w-5 bg-text-100 rounded-lg transition-transform", {
              "-translate-y-[5px] rotate-45": open
            })}></span>
          </button>
        </div>
        {
          open && (
            <ul
              className="text-text-100 text-lg font-light text-center transition-all opacity-0 entry"
              onClick={() => setOpen(false)}
            >
              <li>
                <Link
                  href="/admin/productos"
                  className="block py-2 w-full border-b border-bg-200" >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/pedidos"
                  className="block py-2 w-full border-b border-bg-200" >
                  Pedidos
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/ventas"
                  className="block py-2 w-full border-b border-bg-200" >
                  Ventas
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/codigos-de-descuento"
                  className="block py-2 w-full" >
                  Códigos de descuento
                </Link>
              </li>
            </ul>
          )
        }
      </nav>
    </nav>
  )
}
