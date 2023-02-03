import { WPImage } from "@/lib/utils/types"
import Image from "next/image"
import Link from "next/link"

// const defaultCta = {
//   text: "Follow for more <span class='text-white'>@AUSTATTOOEXPO</span>",
//   image: {
//     sourceUrl: "/images/defaults/cta-banner-image.jpg",
//     altText: "Banner Image",
//     title: "Banner Image",
//   },
// }

type CallToActionProps = {
  bannerType: "button" | "text" | "image"
  image: WPImage
  link: null | {
    url: string
    target: string
    title: string
  }
  text: string
}
export function CallToAction(content: CallToActionProps) {
  return (
    <div className="text-center">
      <h3 className="text-3xl font-bold uppercase text-primary">
        <Link
          href={content.link?.url || "#"}
          target={content.link?.target || "_self"}
          rel="noopener noreferrer"
        >
          {content.bannerType === "button" && (
            <button className="btn-primary">{content.link?.title}</button>
          )}

          {content.bannerType === "text" && (
            <p dangerouslySetInnerHTML={{ __html: content.text }} />
          )}

          {content.bannerType === "image" && (
            <Image
              src={
                content.image?.sourceUrl ||
                "/images/defaults/cta-banner-image.jpg"
              }
              width={1024}
              height={127}
              alt={
                content.image?.altText || content.image?.title || "Banner Image"
              }
            />
          )}
        </Link>
      </h3>
    </div>
  )
}
