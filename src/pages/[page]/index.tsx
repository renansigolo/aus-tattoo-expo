import Container from "@/components/wordpress/container"
import { getPageContent } from "@/lib/queries"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"

type PageProps = {
  title: string
  content: string
}

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const page: PageProps = await getPageContent(query?.page)

  return {
    props: { page },
  }
}

export default function Page({
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="text-white">
      <Container>
        <h1 className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-white sm:text-4xl">
          {page.title}
        </h1>
        <div
          className="prose prose-lg prose-invert prose-pink mx-auto mt-6 text-gray-100"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </Container>
    </main>
  )
}
