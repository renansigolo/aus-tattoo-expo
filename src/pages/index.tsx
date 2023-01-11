import Banner from "@/components/banner"
import Boxes from "@/components/boxes"
import Carousel from "@/components/carousel"
import Cities from "@/components/cities"
import CTA from "@/components/cta"
import FeaturedArtists from "@/components/featured-artists"
import Hero from "@/components/hero"
import Instagram from "@/components/instagram"
import Sponsors from "@/components/sponsors"
import YoutubePlayer from "@/components/youtube-player"
import { getAllPostsForHome, getHomePageContent } from "@/lib/queries"
import { Artists, getAllArtistsProfiles } from "@/lib/queries-legacy"
import { GetStaticProps } from "next"
import Head from "next/head"

type IndexProps = {
  allPosts: { edges: any }
  homePageContent: any
  artists: Artists
}

export default function Index({
  allPosts: { edges },
  homePageContent,
  artists,
}: IndexProps): JSX.Element {
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
      <Banner />
      <YoutubePlayer embedId={homePageContent?.page?.embedId} />
      <Carousel />
      <Cities events={homePageContent?.events} />
      <FeaturedArtists featuredArtists={artists.profiles} />
      <CTA />
      <Boxes />
      <Instagram />
      <Sponsors images={homePageContent?.page?.sponsors?.images} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview)
  const homePageContent = await getHomePageContent()
  const artists = await getAllArtistsProfiles()

  return {
    props: { allPosts, homePageContent, artists, preview },
    revalidate: 10,
  }
}
