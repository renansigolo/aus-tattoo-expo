import { WPImage } from "@/lib/utils/types"
import Image from "next/image"

export type HeroBannerProps = WPImage

export function HeroBanner({
  sourceUrl = "/images/defaults/hero-banner.jpg",
  altText = "Hero Banner",
  title = "Hero Banner Title",
}: HeroBannerProps) {
  if (!sourceUrl) return <></>
  return (
    <section>
      <Image
        priority
        width={1920}
        height={1080}
        alt={altText || title}
        src={sourceUrl}
        className="h-auto max-h-72 object-cover"
      />
    </section>
  )
}
