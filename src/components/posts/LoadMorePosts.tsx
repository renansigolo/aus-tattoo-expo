import { Posts } from "@/components/posts/Posts"
import { PER_PAGE_REST } from "@/utils/pagination"
import { useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"

type LoadMorePostsProps = {
  posts: any
  classes?: string
  graphQLQuery?: any
  searchQuery?: string
  slug?: string
  filterCategory?: string
}

export function LoadMorePosts({
  posts,
  classes,
  graphQLQuery,
  searchQuery,
  filterCategory,
  slug,
}: LoadMorePostsProps) {
  const [postsData, setPostsData] = useState(posts?.edges ?? [])
  const [pageInfo, setPageInfo] = useState(posts?.pageInfo)
  const [error, setError] = useState("")

  /** If value of 'posts' passed to this component changes, set new post data and page info. */
  useEffect(() => {
    setPostsData(posts?.edges)
    setPageInfo(posts?.pageInfo)
  }, [posts?.edges, posts?.pageInfo])

  // Refetch posts when filter category changes
  useEffect(() => {
    setPostsData([])

    fetchPosts({
      variables: {
        first: PER_PAGE_REST,
        after: null,
        id: slug,
        search: searchQuery || "",
        categoryName: filterCategory || "",
      },
    })
  }, [filterCategory, searchQuery])

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
      if (data?.posts.artists) {
        setPosts(data?.posts.artists ?? [])
      }
      if (data?.posts.retailers) {
        setPosts(data?.posts.retailers ?? [])
      }
    },
    onError: (error) => {
      setError(
        error?.message ?? "Error: Something went wrong. Please try again later."
      )
    },
  })

  const loadMoreItems = (endCursor: string | null = null) => {
    fetchPosts({
      variables: {
        first: PER_PAGE_REST,
        after: endCursor,
        id: slug,
        categoryName: filterCategory || "",
      },
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
            onClick={() => loadMoreItems(endCursor || "")}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}

      {error && (
        <div className="my-10 flex w-full justify-center">
          No data available
        </div>
      )}
    </div>
  )
}
