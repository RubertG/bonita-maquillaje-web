import Link from "next/link"

interface Props {
  children: React.ReactNode
  href: string
}

export function SocialButton({
  children, href
}: Props) {
  return (
    <Link
      className="w-full relative py-2.5 px-3.5 rounded-lg bg-accent-200 text-text-100 text-center text-xl lg:hover:scale-105 lg:transition-transform"
      target="_blank"
      rel="noreferrer"
      href={href}
    >
      {children}
    </Link>
  )
}
