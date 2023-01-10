import Boxes from "@/components/boxes"
import Cities from "@/components/cities"
import FeaturedArtists from "@/components/featured-artists"
import Hero from "@/components/hero"
import Instagram from "@/components/instagram"
import Sponsors from "@/components/sponsors"
import Container from "@/components/wordpress/container"
import { getAllPostsForHome, getHomePageContent } from "@/lib/api"
import { Artists, getAllArtistsProfiles } from "@/lib/legacy-api"
import { GetStaticProps } from "next"
import Head from "next/head"

type IndexProps = {
  allPosts: any
  homePageContent: any
  artists: Artists
}

export default function Index({
  allPosts: { edges },
  homePageContent,
  artists,
}: IndexProps): JSX.Element {
  // const heroPost = edges[0]?.node
  // const morePosts = edges.slice(1)

  return (
    <>
      <Head>
        <title>Australian Tattoo Expo</title>
        <meta name="description" content="Australian Tattoo Expo Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero
        sourceUrl={homePageContent?.page?.featuredImage?.node?.sourceUrl}
        altText={homePageContent?.page?.featuredImage?.node?.altText}
      />

      <Container>
        {/* <Intro /> */}
        {/* {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.featuredImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
      </Container>

      <Cities events={homePageContent?.events} />
      <FeaturedArtists featuredArtists={artists.profiles} />
      <Boxes />
      <Instagram />

      <Sponsors />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview)
  const homePageContent = await getHomePageContent(preview)
  const artists = await getAllArtistsProfiles()

  return {
    props: { allPosts, homePageContent, artists, preview },
    revalidate: 10,
  }
}
