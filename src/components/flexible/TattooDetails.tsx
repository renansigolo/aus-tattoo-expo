import { classNames } from "@/lib/utils/cn"
import { WPImage, WPLink } from "@/lib/utils/types"
import Image from "next/image"
import Link from "next/link"

type TattooDetailsProps = {
  rowDirection: "row" | "row-reverse"
  title: string
  description: string
  mainImage: WPImage | null
  images: WPImage[]
  link: WPLink
}
export function TattooDetails(props: TattooDetailsProps) {
  const { rowDirection, title, description, mainImage, images, link } = props

  return (
    <>
      <div className={classNames("flex flex-col gap-4", rowDirection)}>
        <div className="w-full lg:w-1/2">
          <h2 className="mb-4 text-center text-3xl text-secondary-200 lg:text-start">
            {title}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="flex w-full gap-2">
            <div className="flex h-auto w-[65%]">
              <Image
                src={mainImage?.sourceUrl || "https://placehold.co/256"}
                alt="Image"
                width={512}
                height={512}
                className="w-full object-cover"
              />
            </div>

            <div className="flex w-[35%] flex-col gap-2">
              {images?.map((image) => {
                return (
                  <Image
                    src={image?.sourceUrl || "https://placehold.co/256"}
                    alt="Image"
                    width={512}
                    height={512}
                    key={image.title}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {link && (
        <div className="mt-4 flex justify-center">
          <Link
            href={link.url}
            title={link.title}
            target={link.target}
            className="btn-primary"
          >
            {link.title || "View more"}
          </Link>
        </div>
      )}
    </>
  )
}
