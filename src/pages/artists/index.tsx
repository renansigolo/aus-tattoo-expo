import client from "@/apollo/client"
import { CardImage } from "@/components/CardImage"
import { Container } from "@/components/Container"
import { GetAllArtistsPosts } from "@/interfaces/get-all-artists-posts"
import { PER_PAGE_FIRST } from "@/lib/utils/pagination"
import { GET_ARTISTS } from "@/queries/get-artists"
import { useLazyQuery } from "@apollo/client"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useEffect, useState } from "react"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Artists({ posts }: Props) {
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

    const newPosts = postsData.concat(posts?.edges)

    setPostsData(newPosts)
    setPageInfo({ ...posts?.pageInfo })
  }

  const [fetchPosts, { loading }] = useLazyQuery(GET_ARTISTS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setPosts(data?.posts ?? [])
    },
    // onError: (error) => {
    //   setError(error?.graphQLErrors ?? "")
    // },
  })

  const loadMoreItems = (endCursor: string | null) => {
    fetchPosts({
      variables: {
        first: PER_PAGE_FIRST,
        after: endCursor,
      },
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
      first: PER_PAGE_FIRST,
      after: null,
    },
  })

  return {
    props: { ...data },
    revalidate: 10,
  }
}) satisfies GetStaticProps
