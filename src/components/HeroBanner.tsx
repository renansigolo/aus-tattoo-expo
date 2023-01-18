import { WPImage } from "@/lib/utils/types"
import Image from "next/image"

export type HeroBannerProps = WPImage

export function HeroBanner({ sourceUrl, altText, title }: HeroBannerProps) {
  if (!sourceUrl) return <></>

  return (
    <section>
      <Image
        priority
        width={1920}
        height={1080}
        alt={altText || title || "Hero Banner Title"}
        src={sourceUrl}
        className="h-auto max-h-72 rounded-sm object-cover"
      />
    </section>
  )
}
