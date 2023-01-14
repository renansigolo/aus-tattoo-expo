import { EventLocation } from "@/components/cities"
import { FeaturedArtist } from "@/components/featured-artists"
import { getHomePageContent } from "@/lib/queries"
import { WPImage } from "@/lib/utils/types"
import Home from "@/pages/home"
import { GetStaticProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"

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
  const router = useRouter()
  console.log("🚀 ~ Home ~ router", router)

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
      {router.asPath === "/" && <Home pageContent={pageContent} />}
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
