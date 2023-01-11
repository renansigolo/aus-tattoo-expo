import { classNames } from "@/lib/utils/cn"
import Image from "next/image"
import Link from "next/link"

interface Props {
  title: string
  coverImage: {
    node: {
      sourceUrl: string
    }
  }
  slug?: string
}

export default function CoverImage({ title, coverImage, slug }: Props) {
  const image = (
    <Image
      width={2000}
      height={1000}
      alt={`Cover Image for ${title}`}
      src={coverImage?.node.sourceUrl}
      className={classNames(
        "shadow-small max-w-[100%] max-w-full lg:max-w-screen-sm",
        {
          "hover:shadow-medium transition-shadow duration-200": slug,
        }
      )}
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
