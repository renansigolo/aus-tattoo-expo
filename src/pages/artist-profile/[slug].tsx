import Container from "@/components/wordpress/container"
import Layout from "@/components/wordpress/layout"
import PostTitle from "@/components/wordpress/post-title"
import { getAllArtistsWithSlug, getArtistProfile } from "@/lib/legacy-api"
import { GetStaticPaths, GetStaticProps } from "next"
import ErrorPage from "next/error"
import Image from "next/image"
import { useRouter } from "next/router"

export default function ArtistProfile({ post }: any) {
  console.log("🚀 ~ ArtistProfile ~ post", post)
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <article className="text-white">
            <h1>{post.title}</h1>
            <div className="sm:flex">
              <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                <Image
                  src={post.profileImg}
                  alt={`Profile Image of ${post.title}`}
                  width={128}
                  height={128}
                  className="h-32 w-full border border-gray-300 bg-white text-gray-300 sm:w-32"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold">Name: {post.title}</h4>
                <p className="mt-1">Studio: {post.studioName}</p>
                <p className="mt-1">Contact: {post.contactEmail}</p>
              </div>
            </div>
          </article>
        )}
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getArtistProfile(params?.slug)

  return {
    props: {
      post: data.post,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allArtistsPosts = await getAllArtistsWithSlug()

  return {
    paths:
      allArtistsPosts.edges.map(
        ({ node }: any) => `/artist-profile/${node.slug}`
      ) || [],
    fallback: true,
  }
}
