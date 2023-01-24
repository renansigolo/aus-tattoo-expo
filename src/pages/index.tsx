import { PageTemplate } from "@/layouts/PageTemplate"
import { getPageContent } from "@/lib/queries"
import { GetStaticProps, InferGetStaticPropsType } from "next"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({ page }: Props) {
  return (
    // <Layout data={data}>
    <PageTemplate
      heroBanner={page.pageHeading.heroBanner}
      flexibleContent={page.flexibleContent}
      isFrontPage={page.isFrontPage}
    />
    // </Layout>
  )
}

export const getStaticProps = (async () => {
  const page = await getPageContent("/")

  // const { data } = await client.query<GetMenus>({
  //   query: GET_MENUS,
  // })

  return {
    props: { page },
    revalidate: 10,
  }
}) satisfies GetStaticProps
