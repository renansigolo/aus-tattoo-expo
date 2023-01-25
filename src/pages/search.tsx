import client from "@/apollo/client"
import { LoadMorePosts } from "@/components/posts/LoadMorePosts"
import { SearchBox } from "@/components/search/SearchBox"
import { PER_PAGE_FIRST } from "@/lib/utils/pagination"
import { GET_LAYOUT } from "@/queries/get-layout"
import {
  GET_SEARCH_RESULTS,
  GET_SEARCH_RESULTS_WITH_TOTAL_PAGES,
} from "@/queries/search/get-search-results"
import { useLazyQuery } from "@apollo/client"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useState } from "react"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Search({ data }: Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchError, setSearchError] = useState("")
  const [queryResultPosts, setQueryResultPosts] = useState({})
  const [showResultInfo, setShowResultInfo] = useState(false)

  const [fetchPosts, { loading }] = useLazyQuery(
    GET_SEARCH_RESULTS_WITH_TOTAL_PAGES,
    {
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        setQueryResultPosts(data?.posts ?? {})
        setShowResultInfo(true)
      },
      onError: (error) => {
        setSearchError(
          error?.message ??
            "Error: Something went wrong. Please try again later."
        )
      },
    }
  )

  const handleSearchFormSubmit = (event: any) => {
    event.preventDefault()
    setShowResultInfo(false)
    if (!searchQuery) {
      setSearchError("Please enter a text to search")
      setQueryResultPosts({})
      return null
    }
    setSearchError("")
    fetchPosts({
      variables: {
        first: PER_PAGE_FIRST,
        after: null,
        search: searchQuery,
      },
    })

    return null
  }

  return (
    <div className="text-white">
      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchFormSubmit={handleSearchFormSubmit}
      />

      <LoadMorePosts
        posts={queryResultPosts}
        classes="md:container px-5 py-12 mx-auto min-h-almost-screen"
        graphQLQuery={GET_SEARCH_RESULTS}
        searchQuery={""}
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
