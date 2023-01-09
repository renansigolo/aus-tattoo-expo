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
    <main>
      <div>
        <section>
          <div className="flex max-h-[70vh] min-h-[50vh]">
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
      </div>
    </main>
  )
}
