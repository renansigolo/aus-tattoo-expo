import { WPImage } from "src/utils/types"

type SponsorsProps = {
  sponsors: WPImage[] | undefined
}

export function Sponsors({ sponsors }: SponsorsProps) {
  if (!sponsors) return null

  return (
    <section className="bg-black pt-6">
      <div className="flex items-center justify-center gap-2">
        {sponsors.map(({ sourceUrl, altText, title }, index) => (
          <img
            key={index}
            src={sourceUrl}
            alt={altText || title || "Sponsor image"}
            width={256}
            height={256}
            className="grayscale hover:grayscale-0"
          />
        ))}
      </div>
    </section>
  )
}
