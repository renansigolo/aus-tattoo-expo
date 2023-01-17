import { Accordion } from "@/components/Accordion"
import { CallToActionBanner } from "@/components/CallToActionBanner"
import { Carousel } from "@/components/Carousel"
import { Container } from "@/components/Container"
import { HeroBanner } from "@/components/HeroBanner"
import { PageContent } from "@/components/PageContent"
import { Row } from "@/components/Row"
import { YoutubePlayer } from "@/components/YoutubePlayer"
import { getPageContent } from "@/lib/queries"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"

type PageProps = {
  title: string
  layout: {
    rows: [
      {
        components: [
          any
          // fieldGroupName:
          // | "HeroBanner"
          // | "YoutubeVideo"
          // | "ContentEditor"
          // | "CtaBanner"
          // | "Accordion"
          // | "Carousel"
        ]
      }
    ]
  }
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
        {page.layout.rows.map((row, index) => (
          <Row key={index} col={row.components.length}>
            {/* Map over the flexible content and render the appropriate component based
            on the fieldGroupName. */}
            {row.components?.map((component, index: number) => {
              return (
                <div key={index} className="my-3">
                  {component.fieldGroupName === "YoutubeVideo" && (
                    <YoutubePlayer videoUrl={component.videoUrl} />
                  )}
                  {component.fieldGroupName === "HeroBanner" && (
                    <HeroBanner {...component.image} />
                  )}
                  {component.fieldGroupName === "Carousel" && (
                    <Carousel images={component.images} />
                  )}
                  {component.fieldGroupName === "ContentEditor" && (
                    <PageContent content={component.content} />
                  )}
                  {component.fieldGroupName === "CtaBanner" && (
                    <CallToActionBanner {...component} />
                  )}
                  {component.fieldGroupName === "Accordion" && (
                    <Accordion {...component} />
                  )}
                </div>
              )
            })}
          </Row>
        ))}
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
