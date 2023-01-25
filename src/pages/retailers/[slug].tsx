import client from "@/apollo/client"
import { Carousel } from "@/components/flexible/Carousel"
import { Container } from "@/components/layout/Container"
import { LoadMorePosts } from "@/components/posts/LoadMorePosts"
import { GetTaxonomies } from "@/interfaces/get-taxonomies"
import { PER_PAGE_FIRST } from "@/lib/utils/pagination"
import { GET_RETAILERS } from "@/queries/get-retailers"
import { GET_TAXONOMIES } from "@/queries/get-taxonomies"
import { GET_RETAILERS_POSTS } from "@/queries/posts/get-posts"
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
    <>
      <Container>
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <Carousel useDefault={true} />

            <article className="py-8 text-white">
              <LoadMorePosts posts={posts} graphQLQuery={GET_RETAILERS} />
            </article>
          </>
        )}
      </Container>
    </>
  )
}

export const getStaticProps = (async ({ params }) => {
  const { data } = await client.query({
    query: GET_RETAILERS_POSTS,
    variables: {
      id: params?.slug,
      uri: `retailers/${params?.slug}`,
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
    paths: data.eventTaxonomies?.nodes.map(({ slug }) => `/retailers/${slug}`),
    fallback: true,
  }
}
