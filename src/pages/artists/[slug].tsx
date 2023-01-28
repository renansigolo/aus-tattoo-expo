import client from "@/apollo/client"
import { Carousel } from "@/components/flexible/Carousel"
import { Container } from "@/components/layout/Container"
import { LoadMorePosts } from "@/components/posts/LoadMorePosts"
import { Posts } from "@/components/posts/Posts"
import { GetPosts } from "@/interfaces/get-posts"
import { GetTaxonomies } from "@/interfaces/get-taxonomies"
import { PER_PAGE_FIRST } from "@/lib/utils/pagination"
import { GET_ARTISTS } from "@/queries/get-artists"
import { GET_TAXONOMIES } from "@/queries/get-taxonomies"
import { GET_ARTISTS_POSTS } from "@/queries/posts/get-posts"
import localFont from "@next/font/local"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import ErrorPage from "next/error"
import { useRouter } from "next/router"

const lango = localFont({
  src: [
    {
      path: "../../../public/fonts/lango.woff2",
      weight: "600",
      style: "normal",
    },
  ],
})

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function EventsPage({ page, posts }: Props) {
  const router = useRouter()

  if (!router.isFallback && !posts) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <div className={lango.className}>
      <Container>
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <Carousel useDefault={true} />

            <article className="py-8 text-white">
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

              <hr className="my-20" />

              <h2 className="mb-2 text-center text-3xl">Artists Attending</h2>
              <h3 className="mb-8 text-center text-lg text-gray-400">
                {page?.title}
              </h3>

              <LoadMorePosts posts={posts} graphQLQuery={GET_ARTISTS} />
            </article>
          </>
        )}
      </Container>
    </div>
  )
}

export const getStaticProps = (async ({ params }) => {
  const { data } = await client.query<GetPosts>({
    query: GET_ARTISTS_POSTS,
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
