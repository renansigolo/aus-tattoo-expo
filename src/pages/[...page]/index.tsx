import { PageTemplate } from "@/layouts/PageTemplate"
import { getPageContent } from "@/lib/queries"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Page({ page }: Props) {
  return (
    <PageTemplate
      title={page.title}
      heroBanner={page.pageHeading.heroBanner}
      flexibleContent={page.flexibleContent}
    />
  )
}

export const getServerSideProps = (async (ctx) => {
  const page = await getPageContent(ctx.resolvedUrl)

  return {
    props: { page },
  }
}) satisfies GetServerSideProps
