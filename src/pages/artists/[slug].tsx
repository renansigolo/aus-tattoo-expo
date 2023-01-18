import { CardImage } from "@/components/CardImage"
import { Container } from "@/components/Container"
import { getArtistsByEvent, getArtistsTaxonomies } from "@/lib/queries"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import ErrorPage from "next/error"
import { useRouter } from "next/router"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function EventsPage({ post }: Props) {
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
                      description={node.artist.studioName}
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

export const getStaticProps = (async ({ params }) => {
  const data = await getArtistsByEvent(params?.slug)

  return {
    props: {
      post: data.eventTaxonomy,
    },
    revalidate: 10,
  }
}) satisfies GetStaticProps

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getArtistsTaxonomies()

  return {
    paths:
      data.eventTaxonomies.nodes.map(
        ({ slug }: { slug: string }) => `/artists/${slug}`
      ) || [],
    fallback: true,
  }
}
