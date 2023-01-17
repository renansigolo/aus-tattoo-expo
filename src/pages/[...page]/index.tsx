import { Container } from "@/components/Container"
import { FlexibleComponent } from "@/components/FlexibleComponent"
import { Row } from "@/components/Row"
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
          <Row key={index} columns={row.components.length}>
            {row.components?.map((component, index: number) => {
              return (
                <div key={index} className="my-3">
                  <FlexibleComponent component={component} />
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
