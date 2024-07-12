"use client"

import { Delete } from "@/components/common/icons"
import { FileInput } from "@/components/common/input"
import { LIMIT_FILES_SIZE } from "@/consts/admin/admin"
import { FileStateItem } from "@/types/admin/admin"
import { ChangeEvent, useState } from "react"

interface Props {
  className?: string
  items: FileStateItem[]
  setItems: (items: FileStateItem[]) => void
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
  const [totalSize, setTotalSize] = useState(0)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError("")

    if (event.target.files) {
      const files = Array.from(event.target.files)
      const newItems: FileStateItem[] = []
      let filesSizes = items.reduce((total, item) => total + item.size, 0)

      for (const file of files) {
        filesSizes += file.size

        if (filesSizes > LIMIT_FILES_SIZE) {
          filesSizes -= file.size
          setError(`Se alcanzó el límite del tamaño de los archivos (${returnFileSize(LIMIT_FILES_SIZE)})`)
          continue
        }

        newItems.push({
          name: file.name,
          size: file.size,
          url: URL.createObjectURL(file)
        })
      }

      setTotalSize(filesSizes)
      setItems([...items, ...newItems])
    }
  }

  const handleDelete = (item: FileStateItem) => {
    setError("")
    setTotalSize(totalSize - items.find((it) => it.name === item.name)!.size)
    setItems(items.filter((it) => it.name !== item.name))
  }

  return (
    <section className={`${className}`}>
      <p
        className="text-sm text-text-100 mb-3 font-light">
        Por recomendación y optimización, sube las imágenes en formato <span className="text-accent-300 font-medium">3/4</span> y que el peso total de todas estas no superen los <span className="text-accent-300 font-medium">{returnFileSize(LIMIT_FILES_SIZE)}</span>.
      </p>
      <FileInput
        onChange={handleChange}
      />
      <p className="text-sm text-text-100 mt-3 font-light">
        El peso total cargado es de <span className="text-accent-300 font-medium">{returnFileSize(totalSize)}</span>
      </p>
      <ul className="grid gap-3 mt-5">
        {
          items.map((item, index) => (
            <li
              className="flex w-full gap-2 items-center rounded-lg justify-between lg:transition-colors overflow-hidden"
              key={index}
            >
              <div className="flex gap-2 items-center justify-between overflow-hidden">
                <img
                  className="w-16 object-cover rounded-lg aspect-[3/4]"
                  loading="lazy"
                  src={item.url} alt={`${item.name} - Bonita Maquillaje`}
                  title={`${item.name} - Bonita Maquillaje`} />
                <div className="w-full overflow-hidden">
                  <p className="font-light text-text-200 whitespace-nowrap overflow-hidden text-ellipsis"
                    title={item.name}
                  >
                    {item.name}
                  </p>
                  <p className="font-light text-sm text-text-200">
                    {returnFileSize(item.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(item)}
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