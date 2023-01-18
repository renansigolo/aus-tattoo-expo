import { WPImage } from "@/lib/utils/types"
import Image from "next/image"
import Link from "next/link"

type CardImageProps = {
  image: WPImage
  title: string
  description: string
  url: string
}
export function CardImage({ image, title, description, url }: CardImageProps) {
  return (
    <>
      <div className="relative">
        <div className="group block aspect-square w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-600">
          <Image
            src={image.sourceUrl}
            alt={image.altText || image.title || "Card image"}
            width={256}
            height={256}
            className="pointer-events-none min-w-full object-cover group-hover:opacity-75"
          />
          <Link href={url} className="absolute inset-0 focus:outline-none" />
        </div>
        <p className="pointer-events-none mt-2 block truncate text-lg font-medium text-gray-50">
          {title}
        </p>
        <p className="pointer-events-none block font-medium text-gray-300">
          {description}
        </p>
      </div>
    </>
  )
}
