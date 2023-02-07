import client from "@/apollo/client"
import { Container } from "@/components/layout/Container"
import { GetArtistsByEvent } from "@/interfaces/get-artists-by-event"
import { GetTaxonomies } from "@/interfaces/get-taxonomies"
import { EventsLayout } from "@/layouts/EventsLayout"
import { PER_PAGE_FIRST } from "@/lib/utils/pagination"
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

  const category = router.asPath.split("/")?.[1] as any

  return (
    <Container>
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <EventsLayout page={page} posts={posts} category={category} />
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
