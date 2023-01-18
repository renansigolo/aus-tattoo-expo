import { WPImage } from "@/lib/utils/types"
import Image from "next/image"
import Link from "next/link"

type Box = {
  image: WPImage
  link: {
    title: string
    url: string
    target: string
  }
}

type BoxesProps = {
  boxes: Box[]
}

export function Boxes({ boxes }: BoxesProps) {
  if (!boxes) return <></>

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {boxes.map((box) => (
          <Link
            href={box.link.url}
            key={box.link.title}
            target={box.link.target}
          >
            <div className="grid w-full justify-items-center text-center uppercase">
              <button className="absolute inline-grid items-center self-center rounded-sm border border-transparent bg-primary-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                {box.link.title}
              </button>
              <Image
                width={328}
                height={328}
                src={box.image.sourceUrl}
                alt={box.image.altText}
                className="object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
