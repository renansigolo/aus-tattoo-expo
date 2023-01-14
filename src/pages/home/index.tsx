import Banner from "@/components/banner"
import Boxes from "@/components/boxes"
import Carousel from "@/components/carousel"
import Cities, { EventLocation } from "@/components/cities"
import CTA from "@/components/cta"
import FeaturedArtists, { FeaturedArtist } from "@/components/featured-artists"
import Hero from "@/components/hero"
import Instagram from "@/components/instagram"
import Container from "@/components/wordpress/container"
import YoutubePlayer from "@/components/youtube-player"
import { getHomePageContent } from "@/lib/queries"
import { WPImage } from "@/lib/utils/types"
import { GetStaticProps } from "next"

type HomeProps = {
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
export default function Home({ pageContent }: HomeProps) {
  return (
    <>
      <Container>
        <Hero {...pageContent.heroBanner} />
      </Container>
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
