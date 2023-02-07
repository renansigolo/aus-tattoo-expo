import client from "@/apollo/client"
import { Container } from "@/components/layout/Container"
import { Posts } from "@/components/posts/Posts"
import { GetRetailers } from "@/interfaces/get-retailers"
import { PER_PAGE_FIRST } from "@/lib/utils/pagination"
import { GET_RETAILERS } from "@/queries/get-retailers"
import { useLazyQuery } from "@apollo/client"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useEffect, useState } from "react"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Retailers({ posts }: Props) {
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

  const [fetchPosts, { loading }] = useLazyQuery(GET_RETAILERS, {
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
          Retailers Line Up
        </h1>

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
  const { data } = await client.query<GetRetailers>({
    query: GET_RETAILERS,
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
