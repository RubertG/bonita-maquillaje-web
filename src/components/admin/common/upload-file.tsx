"use client"

import { Delete } from "@/components/common/icons"
import { FileInput } from "@/components/common/input"
import { LIMIT_FILES_SIZE } from "@/consts/admin/admin"
import { FileStatusItem } from "@/types/admin/admin"
import { ChangeEvent, useState } from "react"

interface Props {
  className?: string
  items: FileStatusItem[]
  setItems: (items: FileStatusItem[]) => void
}

function returnFileSize(number: number) {
  if (number < 1e3) {
    return `${number} bytes`
  } else if (number >= 1e3 && number < 1e6) {
    return `${(number / 1e3).toFixed(1)} KB`
  } else {
    return `${(number / 1e6).toFixed(1)} MB`
  }
}

export const UploadFile = ({
  className,
  items,
  setItems
}: Props) => {
  const [error, setError] = useState("")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError("")

    if (event.target.files) {
      const files = Array.from(event.target.files)
      const newItems: FileStatusItem[] = []
      let filesSizes = items.reduce((total, item) => total + item.size, 0)

      for (const file of files) {
        filesSizes += file.size

        if (filesSizes > LIMIT_FILES_SIZE) {
          setError(`Se alcanzó el límite de tamaño de archivos (${returnFileSize(LIMIT_FILES_SIZE)})`)
          continue
        }

        newItems.push({
          name: file.name,
          size: file.size,
          url: URL.createObjectURL(file)
        })
      }

      setItems([...items, ...newItems])
    }
  }

  const handleDelete = (name: string) => {
    setError("")
    setItems(items.filter((item) => item.name !== name))
  }

  return (
    <section className={`${className}`}>
      <p
        className="text-sm text-text-100 mb-3 font-light">
        Por recomendación y optimización, sube las imágenes en formato <span className="text-accent-300 font-normal">3/4</span> y que no superen los <span className="text-accent-300 font-normal">{returnFileSize(LIMIT_FILES_SIZE)}</span> en total.
      </p>
      <FileInput
        onChange={handleChange}
      />
      <ul className="grid gap-3 mt-5 lg:mt-3 lg:gap-1">
        {
          items.map((item, index) => (
            <li
              className="flex w-full gap-2 items-center rounded-lg justify-between lg:p-2 lg:hover:bg-bg-200 lg:transition-colors"
              key={index}
            >
              <div className="flex gap-2 items-center justify-between overflow-hidden">
                <img
                  className="w-16 object-cover rounded-lg aspect-[3/4]"
                  loading="lazy"
                  src={item.url} alt={`${item.name} - Bonita Maquillaje`}
                  title={`${item.name} - Bonita Maquillaje`} />
                <div>
                  <p className="font-light text-text-200 whitespace-nowrap"
                    title={item.name}
                  >
                    {item.name}
                  </p>
                  <p className="font-light text-sm text-text-200"
                    title={item.name}
                  >
                    {returnFileSize(item.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(item.name)}
              >
                <Delete className="stroke-text-300 lg:hover:scale-110 lg:transition-transform" />
              </button>
            </li>
          ))
        }
      </ul>
      <p
        className="text-red-500 font-light mt-3 text-sm"
      >{error}</p>
    </section>
  )
}