import { WPImage } from "@/utils/wp-types"
import Link from "next/link"

type CardImageProps = {
  image: WPImage | null
  title: string
  description: string | null
  uri: string
}
export function CardImage({
  image,
  title,
  description = "",
  uri,
}: CardImageProps) {
  return (
    <div className="relative text-center">
      <figure className="group block aspect-square w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-600">
        <img
          src={
            image?.sourceUrl || "/images/defaults/card-profile-placeholder.png"
          }
          alt={image?.altText || image?.title || "Card image"}
          width={300}
          height={300}
          className="pointer-events-none min-w-full object-cover group-hover:opacity-75"
        />
        <Link href={uri} className="absolute inset-0 focus:outline-none" />
      </figure>

      <p className="lango pointer-events-none mt-2 block text-lg font-medium uppercase text-gray-50">
        {title}
      </p>

      <p className="pointer-events-none block text-sm font-medium text-gray-300">
        {description}
      </p>
    </div>
  )
}
