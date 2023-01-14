import PageTitle from "@/components/PageTitle"
import { getPageContent } from "@/lib/queries"
import { GetServerSidePropsContext } from "next"

type PageProps = {
  page: {
    title: string
  }
}
export default function Page({ page }: PageProps) {
  return (
    <main className="text-white">
      <PageTitle title={page.title} />
      <p>This will render the content of each individual page</p>
      <p>Need to have the unique content of that page here</p>
      <p>FlexContainer1</p>
      <p>FlexContainer2</p>
      <p>FlexContainer3</p>
    </main>
  )
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const page = await getPageContent(query?.page)

  return {
    props: { page },
  }
}
