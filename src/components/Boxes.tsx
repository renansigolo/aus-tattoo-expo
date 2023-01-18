import { WPImage } from "@/lib/utils/types"
import Image from "next/image"
import Link from "next/link"

// const defaultBoxes = {
//   items: [
//     {
//       image: {
//         sourceUrl: "/images/defaults/box-1.png",
//         altText: "Retailers",
//         title: "Retailers",
//       },
//       link: {
//         url: "#",
//         title: "Retailers",
//       },
//     },
//     {
//       image: {
//         sourceUrl: "/images/defaults/box-2.png",
//         altText: "Entertainment",
//         title: "Entertainment",
//       },
//       link: {
//         url: "#",
//         title: "Entertainment",
//       },
//     },
//     {
//       image: {
//         sourceUrl: "/images/defaults/box-3.png",
//         altText: "Shop",
//         title: "Shop",
//       },
//       link: {
//         url: "#",
//         title: "Shop",
//       },
//     },
//   ],
// }

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
  if (!items) return <></>

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {items?.map((item) => (
          <Link
            href={item.link.url}
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
              <Image
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
