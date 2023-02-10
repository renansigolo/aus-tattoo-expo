import client from "@/apollo/client"
import { Seo } from "@/components/seo/seo"
import { formatFlexibleComponentsName } from "@/io/mutations/mutations"
import { GetPageContent, GET_PAGE_CONTENT } from "@/io/queries/pages/get-page"
import { PageTemplate } from "@/layouts/PageTemplate"
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
  formatFlexibleComponentsName(data)

  return {
    props: { ...data },
    revalidate: 30,
  }
}) satisfies GetStaticProps
