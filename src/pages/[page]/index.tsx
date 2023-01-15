import Carousel from "@/components/Carousel"
import HeroBanner from "@/components/HeroBanner"
import Container from "@/components/wordpress/container"
import VideoPlayer from "@/components/YoutubePlayer"
import { getPageContent } from "@/lib/queries"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"

const Content = ({ content }: { content: string }) => {
  return (
    <div
      className="prose prose-2xl prose-invert prose-pink mx-auto mt-6 text-gray-100"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

type PageProps = {
  title: string
  pageFlexibleContent?: any[]
}

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const page: PageProps = await getPageContent(query?.page)
  console.log("🚀 ~ page", page)

  return {
    props: { page },
  }
}

export default function Page({
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(
    "🚀 ~ {page.pageFlexibleContent?.map ~ page.pageFlexibleContent",
    page.pageFlexibleContent
  )
  return (
    <main className="text-white">
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
                <Content content={flexibleContent.content} />
              )}
            </div>
          )
        })}
        {/* <Content content={page.content} /> */}
      </Container>
    </main>
  )
}
