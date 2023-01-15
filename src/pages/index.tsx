import Banner from "@/components/Banner"
import Carousel from "@/components/Carousel"
import Cities, { EventLocation } from "@/components/Cities"
import FeaturedArtists, { FeaturedArtist } from "@/components/FeaturedArtists"
import HeroBanner from "@/components/HeroBanner"
import Container from "@/components/wordpress/container"
import VideoPlayer from "@/components/YoutubePlayer"
import { getHomePageContent } from "@/lib/queries"
import { WPImage } from "@/lib/utils/types"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Head from "next/head"

type IndexProps = {
  youtubeVideoId: string
  heroBanner: WPImage
  eventLocations: EventLocation[]
  featuredArtists: FeaturedArtist[]
  carouselImages: WPImage[]
  siteIdentity: {
    title: string
    description: string
  }
}

export default function Index({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{page.siteIdentity.title}</title>
        <meta name="description" content={page.siteIdentity.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <HeroBanner {...page?.heroBanner} />
        <Banner />
        <VideoPlayer videoUrl={page?.youtubeVideoId} />
        <Carousel images={page?.carouselImages} />
        <Cities locations={page?.eventLocations} />
      </Container>

      <section className="flex flex-col bg-zinc-800 py-12 text-center uppercase text-white">
        <Container>
          <FeaturedArtists featuredArtists={page?.featuredArtists} />
        </Container>
      </section>

      {/* <Container>
        <CallToAction />
        <Boxes />
        <Instagram />
      </Container> */}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const page: IndexProps = await getHomePageContent()

  return {
    props: { page },
    revalidate: 10,
  }
}
