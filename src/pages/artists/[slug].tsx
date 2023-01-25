import client from "@/apollo/client"
import { CardImage } from "@/components/CardImage"
import { Carousel } from "@/components/Carousel"
import { Container } from "@/components/Container"
import { GetArtistsByEvent } from "@/interfaces/get-artists-by-event"
import { GetArtistsTaxonomies } from "@/interfaces/get-artists-taxonomies"
import { PER_PAGE_FIRST } from "@/lib/utils/pagination"
import { GET_ARTISTS_BY_EVENT } from "@/queries/get-artists-by-event"
import { GET_ARTISTS_TAXONOMIES } from "@/queries/get-artists-taxonomies"
import { useLazyQuery } from "@apollo/client"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function EventsPage({ page, posts, tattooTaxonomies }: Props) {
  const router = useRouter()
  const [postsData, setPostsData] = useState(posts?.artists.edges ?? [])
  const [pageInfo, setPageInfo] = useState(posts?.artists.pageInfo)
  const [selectedTattooStyle, setSelectedTattooStyle] = useState("")

  useEffect(() => {
    setPostsData(posts?.artists.edges)
    setPageInfo(posts?.artists.pageInfo)
  }, [posts?.artists.edges, posts?.artists.pageInfo])

  const setPosts = (posts: any) => {
    if (!posts || !posts?.edges || !posts?.pageInfo) {
      return
    }

    const newPosts = postsData.concat(posts?.edges)

    setPostsData(newPosts)
    setPageInfo({ ...posts?.pageInfo })
  }

  const [fetchPosts, { loading }] = useLazyQuery(GET_ARTISTS_BY_EVENT, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: GetArtistsByEvent) => {
      setPosts(data?.posts.artists ?? [])
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const [fetchPostsByCategory] = useLazyQuery(GET_ARTISTS_BY_EVENT, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: GetArtistsByEvent) => {
      setPostsData(data?.posts.artists.edges ?? [])
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const loadMoreItems = (endCursor: string | null) => {
    fetchPosts({
      variables: {
        first: PER_PAGE_FIRST,
        after: endCursor,
        id: router.query.slug,
        uri: router.asPath,
        categoryName: selectedTattooStyle,
      },
    })
  }

  const filterByCategory = (category: string) => {
    fetchPostsByCategory({
      variables: {
        first: PER_PAGE_FIRST,
        after: null,
        id: router.query.slug,
        uri: router.asPath,
        categoryName: category,
      },
    })
  }

  if (!router.isFallback && !postsData) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Container>
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <Carousel useDefault={true} />
            <article className="py-8 text-white">
              <h1 className="mb-8 text-center text-5xl">{posts.name}</h1>
              {/* Featured Artists */}
              {page.eventsContent.featured && (
                <>
                  <h2 className="mb-8 text-center text-3xl">
                    Featured Artists
                  </h2>
                  <div className="mx-auto">
                    <div
                      role="list"
                      className="grid grid-cols-2 gap-3 text-center sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
                    >
                      {page.eventsContent.featured?.map((node) => (
                        <CardImage
                          key={node.slug}
                          image={node.acfFeaturedImage.profileImage}
                          title={node.title}
                          description={node.artist.studioName}
                          url={`/artists/profile/${node.slug}`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              <hr className="my-20" />

              <h2 className="mb-8 text-center text-3xl">
                {posts.name.split(" ")[0]} Artists Attending
              </h2>

              <div className="mb-8 flex w-full flex-col justify-between gap-4 align-middle sm:flex-row">
                {/* Search Bar */}
                {/* <div className="flex w-full">
                  <div className="w-full sm:w-1/2">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        disabled
                        id="search"
                        name="search"
                        className="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div> */}

                {/* Select Category */}
                <div className="w-full sm:max-w-xs">
                  {/* <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Filter by
                  </label> */}

                  <select
                    id="tattooStyle"
                    name="tattooStyle"
                    className="block w-full rounded-md border-gray-900 bg-gray-800 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    defaultValue="all"
                    value={selectedTattooStyle}
                    onChange={(e) => {
                      setSelectedTattooStyle(e.target.value)
                      filterByCategory(e.target.value)
                    }}
                  >
                    <option value="">Category</option>
                    {tattooTaxonomies.nodes.map((node) => (
                      <option key={node.name} value={node.name}>
                        {node.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mx-auto">
                <div
                  role="list"
                  className="grid grid-cols-2 gap-3 text-center sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
                >
                  {postsData?.map(({ node }) => (
                    <CardImage
                      key={node.slug}
                      image={node.acfFeaturedImage.profileImage}
                      title={node.title}
                      description={node.artist.studioName}
                      url={`/artists/profile/${node.slug}`}
                    />
                  ))}
                </div>
                {pageInfo?.hasNextPage && (
                  <div className="flex w-full justify-center lg:my-10">
                    <button
                      className="btn-primary"
                      onClick={() => loadMoreItems(pageInfo.endCursor)}
                    >
                      {loading ? "Loading..." : "Load more"}
                    </button>
                  </div>
                )}
              </div>
            </article>
          </>
        )}
      </Container>
    </>
  )
}

export const getStaticProps = (async ({ params }) => {
  const { data } = await client.query<GetArtistsByEvent>({
    query: GET_ARTISTS_BY_EVENT,
    variables: {
      id: params?.slug,
      uri: `artists/${params?.slug}`,
      first: PER_PAGE_FIRST,
      after: null,
      categoryName: null,
      // categoryName: String(params?.slug).replace("-", "+"),
    },
  })

  return {
    props: { ...data },
    revalidate: 10,
  }
}) satisfies GetStaticProps

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<GetArtistsTaxonomies>({
    query: GET_ARTISTS_TAXONOMIES,
  })

  return {
    paths:
      data.eventTaxonomies?.nodes.map(
        ({ slug }: { slug: string }) => `/artists/${slug}`
      ) || [],
    fallback: true,
  }
}
