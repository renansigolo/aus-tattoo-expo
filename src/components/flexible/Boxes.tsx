import { WPImage } from "@/utils/wp-types"
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url"
import Link from "next/link"

type Box = {
  image: WPImage
  link: {
    url: string
    title: string
    target?: string
  }
}

type BoxesProps = {
  items: Box[] | null
}

export function Boxes({ items }: BoxesProps) {
  if (!items) return null

  const formatUrl = (item: Box) => {
    const isPdf = item.link.url.includes(".pdf")
    return isPdf ? item.link.url : parseUrl(item.link.url).pathname
  }

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {items?.map((item) => (
          <Link
            href={formatUrl(item)}
            key={item.link.title}
            target={item.link.target}
          >
            <div
              className="grid w-full justify-items-center text-center uppercase"
              style={{ display: "-webkit-flex", justifyContent: "center" }}
            >
              <button className="absolute inline-grid items-center self-center rounded-sm border border-transparent bg-primary-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                {item.link.title}
              </button>
              <img
                width={328}
                height={328}
                src={item.image.sourceUrl}
                alt={item.image.altText || item.image.title || "Box image"}
                className="object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
