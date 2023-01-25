import { Container } from "@/components/layout/Container"
import { LoadMorePosts } from "@/components/posts/LoadMorePosts"
import { SearchBox } from "@/components/search/SearchBox"
import { PER_PAGE_FIRST } from "@/lib/utils/pagination"
import {
  GET_SEARCH_RESULTS,
  GET_SEARCH_RESULTS_WITH_TOTAL_PAGES,
} from "@/queries/search/get-search-results"
import { useLazyQuery } from "@apollo/client"
import { SyntheticEvent, useState } from "react"

export default function Search() {
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

  const handleSearchFormSubmit = (event: SyntheticEvent) => {
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
        query: searchQuery,
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

      <Container>
        <LoadMorePosts
          posts={queryResultPosts}
          graphQLQuery={GET_SEARCH_RESULTS}
          searchQuery={searchQuery}
        />
      </Container>
    </div>
  )
}
