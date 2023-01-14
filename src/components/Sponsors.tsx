import Container from "@/components/wordpress/container"
import { WPImage } from "@/lib/utils/types"
import Image from "next/image"
import style from "./sponsors.module.scss"

type SponsorsProps = {
  images: {
    sponsors: WPImage[]
  }
}
export default function Sponsors(images: WPImage[]) {
  if (!images) return null

  return (
    <section className="bg-black pt-6">
      <Container>
        <div className={style.sponsors}>
          {images.map((image, index) => (
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
