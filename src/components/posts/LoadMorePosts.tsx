import { Posts } from "@/components/posts/Posts"
import { PER_PAGE_FIRST } from "@/lib/utils/pagination"
import { useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"

type LoadMorePostsProps = {
  posts: any
  classes?: string
  graphQLQuery?: any
  searchQuery?: string
}

export function LoadMorePosts({
  posts,
  classes,
  graphQLQuery,
  searchQuery,
}: LoadMorePostsProps) {
  const [postsData, setPostsData] = useState(posts?.edges ?? [])
  const [pageInfo, setPageInfo] = useState(posts?.pageInfo)

  const [error, setError] = useState("")

  /**
   * If value of 'posts' passed to this component changes, set new post data and page info.
   */
  useEffect(() => {
    setPostsData(posts?.edges)
    setPageInfo(posts?.pageInfo)
  }, [posts?.edges, posts?.pageInfo])

  /** Set posts */
  const setPosts = (posts: any): void => {
    if (!posts || !posts?.edges || !posts?.pageInfo) {
      return
    }

    const newPosts = postsData.concat(posts?.edges)
    setPostsData(newPosts)
    setPageInfo({ ...posts?.pageInfo })
  }

  const [fetchPosts, { loading }] = useLazyQuery(graphQLQuery, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setPosts(data?.posts ?? [])
    },
    onError: (error) => {
      setError(
        error?.message ?? "Error: Something went wrong. Please try again later."
      )
    },
  })

  const loadMoreItems = (endCursor: string | null = null) => {
    let queryVariables = {
      first: PER_PAGE_FIRST,
      after: endCursor,
    }

    // If its a search query then add the query in the query variables.
    // if (searchQuery) {
    //   queryVariables.query = searchQuery
    // }

    fetchPosts({
      variables: queryVariables,
    })
  }

  const { endCursor, hasNextPage } = pageInfo || {}

  return (
    <div className={classes}>
      <Posts posts={postsData} />

      {hasNextPage && (
        <div className="flex w-full justify-center lg:my-10">
          <button
            className="btn-primary"
            onClick={() => loadMoreItems(endCursor)}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}

      {error && (
        <div className="my-10 flex w-full justify-center">
          No articles available
        </div>
      )}
    </div>
  )
}
