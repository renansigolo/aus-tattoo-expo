import { PageTemplate } from "@/layouts/PageTemplate"
import { getPageContent } from "@/lib/queries"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Head from "next/head"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Index({ page }: Props) {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTemplate
        flexibleContent={page.flexibleContent}
        isFrontPage={page.isFrontPage}
      />
    </>
  )
}

export const getStaticProps = (async () => {
  const page = await getPageContent("/")

  return {
    props: { page },
    revalidate: 10,
  }
}) satisfies GetStaticProps
