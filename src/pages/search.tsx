import { Alert } from "@/components/feedback/Alert"
import { Container } from "@/components/layout/Container"
import { LoadMorePosts } from "@/components/posts/LoadMorePosts"
import { ResultInfo } from "@/components/search/ResultInfo"
import { SearchBox } from "@/components/search/SearchBox"
import { useLazyQuery } from "@apollo/client"
import { SyntheticEvent, useState } from "react"
import {
  GET_SEARCH_RESULTS,
  GET_SEARCH_RESULTS_WITH_TOTAL_PAGES,
} from "src/io/queries/search/get-search-results"
import { PER_PAGE_FIRST } from "src/utils/pagination"

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchError, setSearchError] = useState("")
  const [queryResultPosts, setQueryResultPosts] = useState<any>({})
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

    setSearchError("")
    fetchPosts({
      variables: {
        first: PER_PAGE_FIRST,
        after: null,
        query: searchQuery,
        categoryName: selectedCategory,
      },
    })

    return null
  }

  const totalPostResultCount =
    queryResultPosts?.pageInfo?.offsetPagination?.total

  return (
    <div className="text-white">
      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
        handleSearchFormSubmit={handleSearchFormSubmit}
      />

      <Container>
        {searchError && <Alert severity="error">{searchError}</Alert>}

        {showResultInfo && (
          <ResultInfo
            showResultInfo={showResultInfo}
            totalPostResultCount={totalPostResultCount}
            classnames="mt-4 text-center"
          />
        )}

        <LoadMorePosts
          posts={queryResultPosts}
          graphQLQuery={GET_SEARCH_RESULTS}
          searchQuery={searchQuery}
        />
      </Container>
    </div>
  )
}
