import CallToActionBanner from "@/components/CallToActionBanner"
import Carousel from "@/components/Carousel"
import HeroBanner from "@/components/HeroBanner"
import { PageContent } from "@/components/PageContent"
import Container from "@/components/wordpress/container"
import VideoPlayer from "@/components/YoutubePlayer"
import { getPageContent } from "@/lib/queries"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"

type PageProps = {
  title: string
  pageFlexibleContent?: any[]
}

export default function Page({
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="min-h-[80vh] text-white">
      <Container>
        <h1 className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-white sm:text-4xl">
          {page.title}
        </h1>
        {/* Map over the flexible content and render the appropriate component based
        on the fieldGroupName. */}
        {page.pageFlexibleContent?.map((flexibleContent, index) => {
          return (
            <div key={index} className="my-3">
              {flexibleContent.fieldGroupName === "Video" && (
                <VideoPlayer videoUrl={flexibleContent.videoUrl} />
              )}
              {flexibleContent.fieldGroupName === "HeroBanner" && (
                <HeroBanner {...flexibleContent.image} />
              )}
              {flexibleContent.fieldGroupName === "Carousel" && (
                <Carousel images={flexibleContent.images} />
              )}
              {flexibleContent.fieldGroupName === "ContentEditor" && (
                <PageContent content={flexibleContent.content} />
              )}
              {flexibleContent.fieldGroupName === "CtaBanner" && (
                <CallToActionBanner {...flexibleContent} />
              )}
            </div>
          )
        })}
      </Container>
    </main>
  )
}

export const getServerSideProps = async ({
  resolvedUrl,
}: GetServerSidePropsContext) => {
  const page: PageProps = await getPageContent(resolvedUrl)

  return {
    props: { page },
  }
}
