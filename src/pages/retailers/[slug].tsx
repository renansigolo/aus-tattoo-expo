import client from "@/apollo/client"
import { EventsLayout } from "@/layouts/EventsLayout"
import { GET_RETAILERS_BY_EVENT } from "@/queries/retailers/get-retailers-by-event"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import { formatFlexibleComponentsName } from "src/io/mutations/mutations"
import { GetTaxonomies, GET_TAXONOMIES } from "src/io/queries/get-taxonomies"
import { PER_PAGE_FIRST } from "src/utils/pagination"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function EventsPage({ page, posts }: Props) {
  const router = useRouter()

  if (!router.isFallback && !posts) {
    return <ErrorPage statusCode={404} />
  }

  const category = router.asPath.split("/")?.[1] as any
  const { slug } = router.query

  return (
    <>
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <EventsLayout
          page={page}
          posts={posts}
          category={category}
          slug={String(slug)}
        />
      )}
    </>
  )
}

export const getStaticProps = (async ({ params }) => {
  const { data } = await client.query({
    query: GET_RETAILERS_BY_EVENT,
    variables: {
      id: params?.slug,
      uri: `retailers/${params?.slug}`,
      first: PER_PAGE_FIRST,
      after: null,
    },
  })

  formatFlexibleComponentsName(data)

  return {
    props: { ...data },
    revalidate: 30,
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
