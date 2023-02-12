import client from "@/apollo/client"
import { HeroBanner } from "@/components/flexible/HeroBanner"
import { Container } from "@/components/layout/Container"
import { Posts } from "@/components/posts/Posts"
import { GetArtists, GET_ARTISTS } from "@/io/queries/artists/get-artists"
import { PER_PAGE_FIRST, PER_PAGE_REST } from "@/utils/pagination"
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
  })

  const loadMoreItems = (endCursor: string | null) => {
    fetchPosts({
      variables: {
        first: PER_PAGE_REST,
        after: endCursor,
      },
    })
  }

  return (
    <section className="text-white">
      <Container>
        <HeroBanner useDefaultValues />
        <h1 className="py-6 text-center text-3xl font-bold tracking-tight text-white sm:text-3xl">
          Tattoo Artist Directory
        </h1>

        <p className="text-center">
          At Australian Tattoo Expo, we have over 1,000 extremely talented
          Tattoo Artists from across Australia and across the globe that are
          either attending or have previously attended our event. You can browse
          through all of these Tattoo Artist profiles by selecting a tattoo
          style that you like. With so many artists available, you&apos;re sure
          to find the one for you!
        </p>

        <Posts posts={postsData} />
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
  const { data } = await client.query<GetArtists>({
    query: GET_ARTISTS,
    variables: {
      first: PER_PAGE_FIRST,
      after: null,
    },
  })

  return {
    props: { ...data },
    revalidate: 30,
  }
}) satisfies GetStaticProps
