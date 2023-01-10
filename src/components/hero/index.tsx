import Container from "@/components/wordpress/container"
import Image from "next/image"

type HeroProps = {
  sourceUrl?: string
  altText?: string
}

export default function Hero({
  sourceUrl = "https://placeholder.pics/svg/1920x1080",
  altText = "Hero Banner",
}: HeroProps) {
  return (
    <Container>
      <section>
        <div className="flex">
          <Image
            priority
            width={1920}
            height={1080}
            alt={altText}
            src={sourceUrl}
            className="h-auto w-screen object-cover"
          />
        </div>
      </section>
    </Container>
  )
}
