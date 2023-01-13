import { WPImage } from "@/lib/utils/types"
import Image from "next/image"

type HeroProps = WPImage

export default function Hero({
  sourceUrl,
  altText = "Hero Banner",
  title = "Hero Banner Title",
}: HeroProps) {
  if (!sourceUrl) return <></>
  return (
    <section>
      <Image
        priority
        width={1920}
        height={1080}
        alt={altText || title}
        src={sourceUrl}
        className="h-auto max-h-72 w-screen object-cover"
      />
    </section>
  )
}
