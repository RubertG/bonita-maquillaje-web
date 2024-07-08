"use client"

import { FileStatusItem } from "@/types/admin/admin"
import { UploadFile } from "../common/upload-file"
import { useState } from "react"

export const ProductForm = () => {
const [items, setItems] = useState<FileStatusItem[]>([])

  return (
    <section>
      <UploadFile
        items={items}
        setItems={setItems} />
    </section>
  )
}