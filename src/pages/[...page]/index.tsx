import client from "@/apollo/client"
import { Seo } from "@/components/seo/seo"
import { GetPageContent, GET_PAGE_CONTENT } from "@/io/queries/pages/get-page"
import { PageTemplate } from "@/layouts/PageTemplate"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Page({ page }: Props) {
  return (
    <>
      <Seo seo={page.seo} />
      <PageTemplate
        title={page.title}
        heroBanner={page.pageHeading.heroBanner}
        flexibleContent={page.flexibleContent}
      />
    </>
  )
}

export const getServerSideProps = (async (ctx) => {
  const { data } = await client.query<GetPageContent>({
    query: GET_PAGE_CONTENT,
    variables: { uri: ctx.resolvedUrl },
  })

  // Extract the last part of the fieldGroupName
  for (const component of data?.page?.flexibleContent?.components) {
    component.fieldGroupName = component.fieldGroupName
      .split("_")
      .pop() as string
  }

  return {
    props: { ...data },
  }
}) satisfies GetServerSideProps
