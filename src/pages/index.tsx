import client from "@/apollo/client"
import { Seo } from "@/components/seo/seo"
import { GetPageContent } from "@/interfaces/get-page-content"
import { PageTemplate } from "@/layouts/PageTemplate"
import { GET_PAGE_CONTENT } from "@/queries/pages/get-page"
import { GetStaticProps, InferGetStaticPropsType } from "next"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({ page }: Props) {
  return (
    <>
      <Seo seo={page.seo} />
      <PageTemplate
        heroBanner={page.pageHeading.heroBanner}
        flexibleContent={page.flexibleContent}
        isFrontPage={page.isFrontPage}
      />
    </>
  )
}

export const getStaticProps = (async () => {
  const { data } = await client.query<GetPageContent>({
    query: GET_PAGE_CONTENT,
  })

  // Extract the last part of the fieldGroupName
  for (const component of data?.page?.flexibleContent?.components) {
    component.fieldGroupName = component.fieldGroupName
      .split("_")
      .pop() as string
  }

  return {
    props: { ...data },
    revalidate: 30,
  }
}) satisfies GetStaticProps
