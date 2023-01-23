import { CardImage } from "@/components/CardImage"
import { Carousel } from "@/components/Carousel"
import { Container } from "@/components/Container"
import { getPostsByEvent, getTaxonomies } from "@/lib/queries"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import ErrorPage from "next/error"
import { useRouter } from "next/router"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function EventsPage({
  page,
  eventTaxonomy,
  tattooTaxonomies,
}: Props) {
  const router = useRouter()

  if (!router.isFallback && !eventTaxonomy?.slug) {
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
              <h1 className="mb-8 text-center text-5xl">
                {eventTaxonomy.name}
              </h1>
              {/* Featured Artists */}
              {page.eventsContent.featured && (
                <>
                  <h2 className="mb-8 text-center text-3xl">
                    Featured Retailers
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
                          description={node.retailer.websiteUrl || ""}
                          url={`/retailers/profile/${node.slug}`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              <hr className="my-20" />

              <h2 className="mb-8 text-center text-3xl">
                {eventTaxonomy.name.split(" ")[0]} Retailers Attending
              </h2>

              <div className="mb-8 flex flex-col gap-4 align-middle sm:flex-row">
                {/* Search Bar */}
                <div className="flex flex-1 justify-center lg:justify-start">
                  <div className="w-full max-w-lg lg:max-w-xs">
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
                        id="search"
                        name="search"
                        className="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto">
                <div
                  role="list"
                  className="grid grid-cols-2 gap-3 text-center sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
                >
                  {eventTaxonomy.retailers.edges.map(({ node }) => (
                    <CardImage
                      key={node.slug}
                      image={node.acfFeaturedImage.profileImage}
                      title={node.title}
                      description={node.retailer?.websiteUrl || ""}
                      url={`/retailers/profile/${node.slug}`}
                    />
                  ))}
                </div>
              </div>
            </article>
          </>
        )}
      </Container>
    </>
  )
}

export const getStaticProps = (async ({ params }) => {
  const data = await getPostsByEvent(params?.slug, "retailers")

  return {
    props: {
      ...data,
    },
    revalidate: 10,
  }
}) satisfies GetStaticProps

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getTaxonomies()

  return {
    paths:
      data.eventTaxonomies.nodes.map(
        ({ slug }: { slug: string }) => `/retailers/${slug}`
      ) || [],
    fallback: true,
  }
}
