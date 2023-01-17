import { WPImage } from "@/lib/utils/types"
import Image from "next/image"

type SponsorsProps = {
  sponsors: WPImage[] | undefined
}

export function Sponsors({ sponsors }: SponsorsProps) {
  if (!sponsors) return null

  return (
    <section className="bg-black pt-6">
      <div className="flex items-center justify-center gap-2">
        {sponsors.map(({ sourceUrl, altText, title }, index) => (
          <Image
            key={index}
            src={sourceUrl}
            alt={altText || title}
            width={256}
            height={256}
            className="grayscale hover:grayscale-0"
          />
        ))}
      </div>
    </section>
  )
}
