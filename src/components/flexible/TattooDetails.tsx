import { classNames } from "@/lib/utils/cn"
import { WPImage, WPLink } from "@/lib/utils/types"
import Link from "next/link"

type TattooDetailsProps = {
  rowDirection: "normal" | "reverse"
  title: string
  description: string
  mainImage: WPImage | null
  images: WPImage[]
  link: WPLink
}
export function TattooDetails(props: TattooDetailsProps) {
  const { rowDirection, title, description, mainImage, images, link } = props
  const rowDirectionClass =
    rowDirection === "normal" ? "lg:flex-row" : "lg:flex-row-reverse"

  return (
    <section className="mb-16">
      <div className={classNames("flex flex-col gap-4", rowDirectionClass)}>
        <div className="w-full lg:w-1/2">
          <h2 className="mb-4 text-center text-3xl text-secondary-200 lg:text-start">
            {title}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="flex w-full gap-2">
            <div className="flex h-auto w-[65%]">
              <img
                loading="lazy"
                src={mainImage?.sourceUrl}
                alt="Image"
                width={512}
                height={512}
                className="w-full object-cover"
              />
            </div>

            <div className="flex w-[35%] flex-col gap-2">
              {images?.map((image) => {
                return (
                  <img
                    loading="lazy"
                    key={image?.title}
                    src={image?.sourceUrl}
                    alt={image?.altText || "Image"}
                    width={512}
                    height={512}
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
    </section>
  )
}
