import Banner from "@/components/banner"
import Boxes from "@/components/boxes"
import Carousel from "@/components/carousel"
import Cities from "@/components/cities"
import CTA from "@/components/cta"
import FeaturedArtists from "@/components/featured-artists"
import Hero from "@/components/hero"
import Instagram from "@/components/instagram"
import YoutubePlayer from "@/components/youtube-player"
import { getHomePageContent } from "@/lib/queries"
import { WPImage } from "@/lib/utils/types"
import { GetStaticProps } from "next"
import Head from "next/head"

type IndexProps = {
  pageContent: {
    youtubeVideoId: string
    heroBanner: WPImage
    eventLocations: [
      {
        active: boolean | null
        date: string
        title: string
        url: string
        venue: string
      }
    ]
    featuredArtists: [
      {
        slug: string
        title: string
        artist: {
          studioName: string
          images: null | WPImage[]
          featuredImage: WPImage
        }
      }
    ]
    sliderImages: WPImage[]
  }
}

export default function Index({ pageContent }: IndexProps) {
  return (
    <>
      <Head>
        <title>Australian Tattoo Expo</title>
        <meta name="description" content="Australian Tattoo Expo Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero {...pageContent.heroBanner} />
      <Banner />
      <YoutubePlayer videoId={pageContent?.youtubeVideoId} />
      <Carousel images={pageContent?.sliderImages} />
      <Cities locations={pageContent?.eventLocations} />
      <FeaturedArtists featuredArtists={pageContent?.featuredArtists} />
      <CTA />
      <Boxes />
      <Instagram />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pageContent = await getHomePageContent()

  return {
    props: { pageContent },
    revalidate: 10,
  }
}
