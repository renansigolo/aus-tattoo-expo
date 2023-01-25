import Image from "next/image"
import Link from "next/link"

export function Post({ post }: any) {
  return (
    <div className="mb-8">
      <figure className="mb-4 overflow-hidden">
        <Image
          {...post?.featuredImage?.node}
          fill
          width="400"
          height="225"
          containerClassNames="w-96 sm:-w-600px md:w-400px h-56 sm:h-338px md:h-225px"
          title={post?.title ?? ""}
          alt="Post IMage"
        />
      </figure>
      <Link href={`/blog/${post?.slug}/`}>
        <a>
          <h2
            className="mb-3 text-lg font-bold hover:text-blue-500"
            dangerouslySetInnerHTML={{ __html: post?.title ?? "" }}
          />
        </a>
      </Link>
      <div dangerouslySetInnerHTML={{ __html: post?.excrept ?? "" }} />
    </div>
  )
}
