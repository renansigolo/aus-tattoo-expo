import client from "@/apollo/client"

import { EventsLayout } from "@/layouts/EventsLayout"
import { formatFlexibleComponentsName } from "@/lib/mutations"
import { PER_PAGE_FIRST } from "@/lib/utils/pagination"
import {
  GetArtistsByEvents,
  GET_ARTISTS_BY_EVENT,
} from "@/queries/artists/get-artists-by-event"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import { GetTaxonomies } from "src/io/interfaces/get-taxonomies"
import { GET_TAXONOMIES } from "src/io/queries/get-taxonomies"

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
  const { data } = await client.query<GetArtistsByEvents>({
    query: GET_ARTISTS_BY_EVENT,
    variables: {
      id: params?.slug,
      uri: `artists/${params?.slug}`,
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
    paths: data.eventTaxonomies?.nodes.map(({ uri }) => uri),
    fallback: true,
  }
}
