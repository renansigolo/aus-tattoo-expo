import { WPImage } from "@/lib/utils/types"
import Image from "next/image"
import { title } from "process"

const defaultValues: HeroBannerProps = {
  useDefaultValues: true,
  mobileImage: {
    sourceUrl: "/images/defaults/hero-banner-mobile.jpg",
    altText: "Hero Banner Title",
    title: "Hero Banner Title",
  },
  image: {
    sourceUrl: "/images/defaults/hero-banner.jpg",
    altText: "Hero Banner Title",
    title: "Hero Banner Title",
  },
}

export type HeroBannerProps = {
  useDefaultValues: boolean
  image?: WPImage | null
  mobileImage?: WPImage | null
}

export function HeroBanner(heroBanner: HeroBannerProps) {
  if (heroBanner.useDefaultValues) heroBanner = defaultValues

  return (
    <section>
      <>
        {/* Mobile Image */}
        <Image
          priority
          width={1920}
          height={1080}
          alt={
            heroBanner.mobileImage?.altText ||
            heroBanner.mobileImage?.title ||
            "Hero Banner Title"
          }
          src={
            heroBanner.mobileImage?.sourceUrl ||
            heroBanner?.image?.sourceUrl ||
            "/images/defaults/hero-banner-mobile.jpg"
          }
          className="h-auto rounded-sm object-cover sm:hidden"
        />

        {/* Desktop Image */}
        <Image
          priority
          width={1920}
          height={1080}
          alt={heroBanner?.image?.altText || title || "Hero Banner Title"}
          src={
            heroBanner?.image?.sourceUrl || "/images/defaults/hero-banner.jpg"
          }
          className="hidden h-auto max-h-96 rounded-sm object-cover sm:block"
        />
      </>
    </section>
  )
}
