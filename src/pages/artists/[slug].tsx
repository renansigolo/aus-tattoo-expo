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
              <div className="mx-auto">
                <h1>Events Page {post.name}</h1>
                {/* <FeaturedArtists featuredArtists={post.artists.edges} /> */}
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
