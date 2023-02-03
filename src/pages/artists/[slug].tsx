import client from "@/apollo/client"
import { Carousel } from "@/components/flexible/Carousel"
import { Container } from "@/components/layout/Container"
import { LoadMorePosts } from "@/components/posts/LoadMorePosts"
import { Posts } from "@/components/posts/Posts"
import { GetArtistsByEvent } from "@/interfaces/get-artists-by-event"
import { GetTaxonomies } from "@/interfaces/get-taxonomies"
import { PER_PAGE_FIRST } from "@/lib/utils/pagination"
import { GET_ARTISTS } from "@/queries/get-artists"
import { GET_ARTISTS_BY_EVENT } from "@/queries/get-artists-by-event"
import { GET_TAXONOMIES } from "@/queries/get-taxonomies"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import ErrorPage from "next/error"
import { useRouter } from "next/router"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function EventsPage({ page, posts }: Props) {
  const router = useRouter()

  if (!router.isFallback && !posts) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Container>
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <>
          <Carousel useDefault={true} />

          <article className="py-8 text-white">
            {page && (
              <>
                <h1 className={"mb-8 text-center text-5xl"}>{page?.title}</h1>
                {page?.eventsContent?.featured && (
                  <>
                    {/* Featured Artists */}
                    <h2 className="font mb-8 text-center text-3xl">
                      Featured Artists
                    </h2>
                    <Posts posts={page?.eventsContent?.featured} />
                  </>
                )}
              </>
            )}

            {posts.artists.edges.length > 0 && (
              <>
                <h2 className="mb-2 text-center text-3xl">Artists Attending</h2>
                <h3 className="mb-8 text-center text-lg text-gray-400">
                  {posts?.name}
                </h3>

                <LoadMorePosts
                  posts={posts.artists}
                  graphQLQuery={GET_ARTISTS}
                />
              </>
            )}
          </article>
        </>
      )}
    </Container>
  )
}

export const getStaticProps = (async ({ params }) => {
  const { data } = await client.query<GetArtistsByEvent>({
    query: GET_ARTISTS_BY_EVENT,
    variables: {
      id: params?.slug,
      uri: `artists/${params?.slug}`,
      first: PER_PAGE_FIRST,
      after: null,
    },
  })

  return {
    props: { ...data },
    revalidate: 10,
  }
}) satisfies GetStaticProps

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<GetTaxonomies>({
    query: GET_TAXONOMIES,
  })

  return {
    paths: data.eventTaxonomies?.nodes.map(({ uri }) => uri),
    fallback: true,
  }
}
