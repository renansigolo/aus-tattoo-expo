import client from "@/apollo/client"
import { Carousel } from "@/components/Carousel"
import { Container } from "@/components/Container"
import { LoadMorePosts } from "@/components/posts/LoadMorePosts"
import { Posts } from "@/components/posts/Posts"
import { GetArtistsTaxonomies } from "@/interfaces/get-artists-taxonomies"
import { GetPosts } from "@/interfaces/get-posts"
import { PER_PAGE_FIRST } from "@/lib/utils/pagination"
import { GET_ARTISTS_BY_EVENT } from "@/queries/get-artists-by-event"
import { GET_ARTISTS_TAXONOMIES } from "@/queries/get-artists-taxonomies"
import { GET_ARTISTS_POSTS } from "@/queries/posts/get-posts"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import ErrorPage from "next/error"
import { useRouter } from "next/router"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function EventsPage({ page, posts }: Props) {
  const router = useRouter()

  if (!router.isFallback && !posts) {
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
              <h1 className="mb-8 text-center text-5xl">{page?.title}</h1>
              {page?.eventsContent?.featured && (
                <>
                  {/* Featured Artists */}
                  <h2 className="mb-8 text-center text-3xl">
                    Featured Artists
                  </h2>
                  <Posts posts={page?.eventsContent?.featured} />
                </>
              )}

              <hr className="my-20" />

              <h2 className="mb-2 text-center text-3xl">Artists Attending</h2>
              <h3 className="mb-8 text-center text-lg text-gray-400">
                {page?.title}
              </h3>

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
                {/* <div className="w-full sm:max-w-xs">
                  <select
                    id="tattooStyle"
                    name="tattooStyle"
                    className="block w-full rounded-md border-gray-900 bg-gray-800 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
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
              </div> */}
              </div>

              <LoadMorePosts
                posts={posts}
                graphQLQuery={GET_ARTISTS_BY_EVENT}
              />
            </article>
          </>
        )}
      </Container>
    </>
  )
}

export const getStaticProps = (async ({ params }) => {
  const { data } = await client.query<GetPosts>({
    query: GET_ARTISTS_POSTS,
    variables: {
      id: params?.slug,
      uri: `artists/${params?.slug}`,
      first: PER_PAGE_FIRST,
      after: null,
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
    paths: data.eventTaxonomies?.nodes.map(({ uri }) => uri),
    fallback: true,
  }
}
