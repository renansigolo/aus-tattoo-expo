import Container from "@/components/wordpress/container"
import Image from "next/image"
import style from "./sponsors.module.scss"

type SponsorsProps = {
  images: [
    {
      image: {
        sourceUrl: string
        altText: string
      }
    }
  ]
}
export default function Sponsors({ images }: SponsorsProps) {
  if (!images) return null

  return (
    <section className="bg-black pt-6">
      <Container>
        <div className={style.sponsors}>
          {images.map(({ image }, index) => (
            <Image
              key={index}
              src={image.sourceUrl || "/images/no-image.svg"}
              alt={image.altText}
              width={256}
              height={256}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
