import client from "@/apollo/client"
import { SearchBox } from "@/components/search/SearchBox"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useState } from "react"
import { GET_LAYOUT } from "src/queries/get-layout"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Search({ data }: Props) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchFormSubmit = (event: any) => {
    event.preventDefault()
    return null
  }

  return (
    <div className="text-white">
      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchFormSubmit={handleSearchFormSubmit}
      />
    </div>
  )
}

export const getStaticProps = (async () => {
  const { data } = await client.query({
    query: GET_LAYOUT,
  })

  return {
    props: { ...data, slug: "search" },
    revalidate: 10,
  }
}) satisfies GetStaticProps
