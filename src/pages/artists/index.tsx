import client from "@/apollo/client"
import { CardImage } from "@/components/CardImage"
import { Container } from "@/components/Container"
import { GetAllArtistsPosts } from "@/interfaces/get-all-artists-posts"
import { useLazyQuery } from "@apollo/client"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useEffect, useState } from "react"
import { GET_ARTISTS } from "src/queries/get-artists"

type Props = InferGetStaticPropsType<typeof getStaticProps>

const graphQLQuery = GET_ARTISTS

export default function Artists({ posts }: Props) {
  /**
   * First set the posts data and pageInfo received from server side,
   * as initial postsData and pageInfo, so that
   * it sever side posts can be fetched, and the new endcursor( contained in pageInfo )
   * can be sent to get the next set of posts.
   */
  const [postsData, setPostsData] = useState(posts?.edges ?? [])
  const [pageInfo, setPageInfo] = useState(posts?.pageInfo)

  useEffect(() => {
    setPostsData(posts?.edges)
    setPageInfo(posts?.pageInfo)
  }, [posts?.edges, posts?.pageInfo])

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
    // onError: (error) => {
    //   setError(error?.graphQLErrors ?? "")
    // },
  })

  const loadMoreItems = (endCursor: string | null) => {
    let queryVariables = {
      first: 5,
      after: endCursor,
    }

    // If its a search query then add the query in the query variables.
    // if (!isEmpty(searchQuery)) {
    //   queryVariables.query = searchQuery
    // }

    fetchPosts({
      variables: queryVariables,
    })
  }

  return (
    <section className="text-white">
      <Container>
        <h1 className="py-6 text-center text-3xl font-bold tracking-tight text-white sm:text-3xl">
          Meet the Artists
        </h1>

        <ul
          role="list"
          className="grid grid-cols-2 gap-3 text-center sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
        >
          {postsData.map(({ node }) => (
            <li key={node.title}>
              <CardImage
                key={node.slug}
                image={node.acfFeaturedImage.profileImage}
                title={node.title}
                description={node.artist.studioName}
                url={`/artists/profile/${node.slug}`}
              />
            </li>
          ))}
        </ul>

        {pageInfo.hasNextPage && (
          <div className="flex w-full justify-center lg:my-10">
            <button
              className="btn-primary"
              onClick={() => loadMoreItems(pageInfo.endCursor)}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </Container>
    </section>
  )
}

export const getStaticProps = (async () => {
  const { data } = await client.query<GetAllArtistsPosts>({
    query: GET_ARTISTS,
    variables: {
      after: null,
    },
  })
  console.log("🚀 ~ getStaticProps ~ data", JSON.stringify(data))

  return {
    props: { ...data },
    revalidate: 10,
  }
}) satisfies GetStaticProps
