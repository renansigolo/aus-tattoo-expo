import { CardImage } from "@/components/CardImage"
import { Container } from "@/components/Container"
import { getAllArtistsByEvent, getArtistsTags } from "@/lib/queries"
import { WPImage } from "@/lib/utils/types"
import { GetStaticPaths, GetStaticProps } from "next"
import ErrorPage from "next/error"
import { useRouter } from "next/router"

type Artist = {
  title: "Minimal"
  slug: "minimal"
  uri: "/artists/minimal/"
  acfFeaturedImage: { featuredImage: WPImage }
}

type EventsPageProps = {
  post: {
    slug: string
    name: string
    artists: {
      edges: any[]
    }
  }
}
export default function EventsPage({ post }: EventsPageProps) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Container>
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <article className="pb-8 text-white">
              <h1 className="mb-8 text-center text-3xl">
                {post.name} Featured Artists
              </h1>
              <div className="mx-auto">
                <div
                  role="list"
                  className="grid gap-3 text-center sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
                >
                  {post.artists.edges.map(({ node }) => (
                    <CardImage
                      key={node.slug}
                      image={node.acfFeaturedImage.featuredImage}
                      title={node.title}
                      description={node.studioName}
                      url={`/artists/profile/${node.slug}`}
                    />
                  ))}
                </div>
              </div>
            </article>
          </>
        )}
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getAllArtistsByEvent(params?.slug)

  return {
    props: {
      post: data.eventTaxonomy,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getArtistsTags()

  return {
    paths:
      data.eventTaxonomies.nodes.map(
        ({ slug }: { slug: string }) => `/artists/${slug}`
      ) || [],
    fallback: true,
  }
}
