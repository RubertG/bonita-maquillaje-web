"use client"

import { Share } from "../common/icons"

interface Props {
  title: string
  url: string
  text: string
}

export const ButtonShare = ({
  text, title, url
}: Props) => {

  const handleShare = async () => {
    try {
      await navigator.share({
        title,
        url: url,
        text
      })
    } catch (error) {
      if (!window) return 
      window.location.href = `https://wa.me/?text=${text}%20${url}`
    }
  }

  return (
    <button
      onClick={handleShare}
    >
      <Share className="stroke-principal-200" />
    </button>
  )
}