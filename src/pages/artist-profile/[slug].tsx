import Container from "@/components/wordpress/container"
import Layout from "@/components/wordpress/layout"
import PostTitle from "@/components/wordpress/post-title"
import { getAllArtistsWithSlug } from "@/lib/legacy-api"
import { GetStaticPaths, GetStaticProps } from "next"
import ErrorPage from "next/error"
import { useRouter } from "next/router"

export default function ArtistProfile() {
  const router = useRouter()

  if (!router.isFallback) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <h1>Artist Content Goes Here</h1>
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allArtistsPosts = await getAllArtistsWithSlug()

  return {
    paths:
      allArtistsPosts.edges.map(
        ({ node }: any) => `/artist-profile/${node.slug}`
      ) || [],
    fallback: true,
  }
}
