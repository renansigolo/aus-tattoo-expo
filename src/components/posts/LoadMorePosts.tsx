import { Posts } from "@/components/posts/Posts"
import { PER_PAGE_FIRST } from "@/lib/utils/pagination"
import { useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"

type LoadMorePostsProps = {
  posts: any
  classes: string
  graphQLQuery: any
  searchQuery: string
}

const LoadMorePosts = ({
  posts,
  classes,
  graphQLQuery,
  searchQuery,
}: LoadMorePostsProps) => {
  /**
   * First set the posts data and pageInfo received from server side,
   * as initial postsData and pageInfo, so that
   * it sever side posts can be fetched, and the new endcursor( contained in pageInfo )
   * can be sent to get the next set of posts.
   */
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

  /**
   * Set posts.
   *
   * @param {Object} posts Posts.
   *
   * @return {void}
   */
  const setPosts = (posts: any) => {
    if (!posts || !posts?.edges || !posts?.pageInfo) {
      return
    }

    /**
     * Concat the newly received post from client request to the existing posts, using setPostsData()
     * and also set the new pageInfo that contains the new endcursor, so that
     * when user clicks on loadmore again, next set of posts can be fetched again.
     * Same process if repeated to it gets concatenated everytime to the existing posts array.
     */
    const newPosts = postsData.concat(posts?.edges)
    setPostsData(newPosts)
    setPageInfo({ ...posts?.pageInfo })
  }

  const [fetchPosts, { loading }] = useLazyQuery(graphQLQuery, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      /**
       * Call setPosts to concat the new set of posts to existing one and update pageInfo
       * that contains the cursor and the information about whether we have the next page.
       */
      setPosts(data?.posts ?? [])
    },
    onError: (error) => {
      setError(
        error?.message ?? "Error: Something went wrong. Please try again later."
      )
    },
  })

  /**
   * Calls fetchPosts
   *
   * fetchPosts() makes a client side request with the new endcursor info,
   * to get next set of posts.
   *
   * @param {String} endCursor Endcursor used to fetch the next set of posts.
   */
  const loadMoreItems = (endCursor = null) => {
    let queryVariables = {
      first: PER_PAGE_FIRST,
      after: endCursor,
      query: "",
    }

    // If its a search query then add the query in the query variables.
    if (!searchQuery) {
      queryVariables.query = searchQuery
    }

    fetchPosts({
      variables: queryVariables,
    })
  }

  /**
   * Pull the endcursor and hasNextPage values from pageInfo
   *
   * Please note that pageInfo gets updated with new endCursor and hasNextPage
   * values everytime a new client side request is made using setPageInfo()
   */
  const { endCursor, hasNextPage } = pageInfo || {}

  return (
    <div className={classes}>
      <Posts posts={postsData} />

      {hasNextPage ? (
        <div className="flex w-full justify-center lg:my-10">
          {loading ? (
            <div className="my-8 flex w-full justify-center border border-white px-3 py-2">
              Loading...
            </div>
          ) : (
            <button
              className="btn-primary"
              onClick={() => loadMoreItems(endCursor)}
            >
              Load more
            </button>
          )}
        </div>
      ) : null}

      {error && (
        <div className="my-10 flex w-full justify-center">
          No articles available
        </div>
      )}
    </div>
  )
}

export default LoadMorePosts
