import { Container } from "@/components/Container"
import { FlexibleComponent } from "@/components/FlexibleComponent"
import { Row } from "@/components/Row"
import { getHomePageContent, getPageContent } from "@/lib/queries"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Head from "next/head"

type IndexProps = {
  siteIdentity: {
    title: string
    description: string
  }
}

export default function Index({
  page,
  dynamicContent,
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
        {dynamicContent.layout.rows.map((row: any, index: number) => (
          <Row key={index} columns={row.components.length}>
            {row.components?.map((component: any, index: number) => {
              return (
                <div key={index} className="my-3">
                  <FlexibleComponent component={component} />
                </div>
              )
            })}
          </Row>
        ))}
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const page: IndexProps = await getHomePageContent()
  const dynamicContent: any = await getPageContent("/")

  return {
    props: { page, dynamicContent },
    revalidate: 10,
  }
}
