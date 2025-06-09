import Link from "next/link"
import Image from "next/image"
import { FC } from "react"

interface LogoProps {
  text?: string
  href?: string
  className?: string
  imgSrc?: string
  imgAlt?: string
}

export const Logo: FC<LogoProps> = ({
  text = "MiTienda",
  href = "/",
  className,
  imgSrc,
  imgAlt = "Logo de MiTienda"
}) => (
  <Link href={href} className={`flex items-center gap-2 ${className || ""}`} aria-label="Ir al inicio">
    {imgSrc && (
      <Image
        src={imgSrc}
        alt={imgAlt}
        width={32}
        height={32}
        className="w-8 h-8 object-contain"
      />
    )}
    <span className="text-xl font-bold text-secondary">{text}</span>
  </Link>
)
