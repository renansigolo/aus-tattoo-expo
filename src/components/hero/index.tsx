import Container from "@/components/wordpress/container"
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
    <Container>
      <section>
        <div className="flex">
          <Image
            priority
            width={1920}
            height={1080}
            alt={altText || title}
            src={sourceUrl}
            className="h-auto w-screen object-cover"
          />
        </div>
      </section>
    </Container>
  )
}
