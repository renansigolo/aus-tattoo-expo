import client from "@/apollo/client"
import { formatFlexibleComponentsName } from "@/apollo/mutations/mutations"
import { GetTaxonomies, GET_TAXONOMIES } from "@/apollo/queries/get-taxonomies"
import { GET_RETAILERS_BY_EVENT } from "@/apollo/queries/retailers/get-retailers-by-event"
import { EventsLayout } from "@/layouts/EventsLayout"
import { PER_PAGE_FIRST } from "@/utils/pagination"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import ErrorPage from "next/error"
import { useRouter } from "next/router"

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
