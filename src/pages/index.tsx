import Banner from "@/components/Banner"
import Boxes from "@/components/boxes"
import CallToAction from "@/components/CallToAction"
import Carousel from "@/components/Carousel"
import Cities, { EventLocation } from "@/components/cities"
import FeaturedArtists, { FeaturedArtist } from "@/components/featured-artists"
import HeroBanner from "@/components/HeroBanner"
import Instagram from "@/components/Instagram"
import Container from "@/components/wordpress/container"
import YoutubePlayer from "@/components/YoutubePlayer"
import { getHomePageContent } from "@/lib/queries"
import { WPImage } from "@/lib/utils/types"
import { GetStaticProps } from "next"
import Head from "next/head"

type IndexProps = {
  pageContent: {
    youtubeVideoId: string
    heroBanner: WPImage
    eventLocations: EventLocation[]
    featuredArtists: FeaturedArtist[]
    sliderImages: WPImage[]
    siteIdentity: {
      title: string
      description: string
    }
  }
}

export default function Index({ pageContent }: IndexProps) {
  return (
    <>
      <Head>
        <title>{pageContent.siteIdentity.title}</title>
        <meta
          name="description"
          content={pageContent.siteIdentity.description}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <HeroBanner {...pageContent.heroBanner} />
      </Container>
      <Banner />
      <YoutubePlayer videoId={pageContent?.youtubeVideoId} />
      <Carousel images={pageContent?.sliderImages} />
      <Cities locations={pageContent?.eventLocations} />
      <FeaturedArtists featuredArtists={pageContent?.featuredArtists} />
      <CallToAction />
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
