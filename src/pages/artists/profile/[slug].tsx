import client from "@/apollo/client"
import { SocialMediaIcons } from "@/components/data-display/SocialMediaIcons"
import { HeroBanner } from "@/components/flexible/HeroBanner"
import { Container } from "@/components/layout/Container"
import { Modal } from "@/components/overlays/Modal"
import { GetArtistProfile } from "@/interfaces/get-artist-profile"
import { getPostsWithSlug } from "@/lib/queries"
import { GET_ARTIST_PROFILE } from "@/queries/get-artist-profile"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import ErrorPage from "next/error"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function ArtistProfile({ post }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [imageRef, setImageRef] = useState("")

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  // Dynamically set grid columns based on the number of categories
  const sectionsGrid =
    post?.categories?.tattooStyle !== null ? "sm:grid-cols-2" : ""

  // Dynamically set the category name
  const category = router.pathname.split("/")[1]

  return (
    <>
      <Container>
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <div className="mb-6 grid w-full justify-items-center">
              <div
                className="grid w-full justify-items-center text-center uppercase"
                style={{ display: "-webkit-flex", justifyContent: "center" }}
              >
                <div className="opacity-50">
                  <HeroBanner
                    sourceUrl={
                      post.acfFeaturedImage.profileImage?.sourceUrl ||
                      "/images/defaults/card-profile-placeholder.png"
                    }
                    altText={
                      post.acfFeaturedImage.profileImage?.altText ||
                      "Profile Image"
                    }
                    title={
                      post.acfFeaturedImage.profileImage?.title ||
                      "Profile Image"
                    }
                  />
                </div>
                <div className="absolute inline-grid items-center self-center text-center text-white">
                  <h2 className="mb-1 text-3xl font-semibold sm:text-5xl">
                    {post.title}
                  </h2>
                  <p className="sm:text-xl">{post.artist.studioName}</p>
                </div>
              </div>
            </div>
            <article className="pb-8">
              <div className="mx-auto">
                <h1 className="sr-only">Profile of {post.title}</h1>
                {/* Left column */}
                <div className="grid grid-cols-1 gap-4">
                  {/* Welcome panel */}
                  <section aria-labelledby="profile-overview-title">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                      <h2 className="sr-only" id="profile-overview-title">
                        Profile Overview
                      </h2>
                      <div className="bg-white p-6">
                        <div className="sm:flex sm:items-center sm:justify-between">
                          <div className="sm:flex sm:space-x-5">
                            <div className="flex-shrink-0">
                              <Image
                                src={
                                  post.acfFeaturedImage.profileImage
                                    ?.sourceUrl ||
                                  "/images/defaults/card-profile-placeholder.png"
                                }
                                alt={`Profile Image of ${post.title}`}
                                width={128}
                                height={128}
                                className="mx-auto h-20 w-20 rounded-full"
                              />
                            </div>
                            <div className="felx mt-4 flex h-20 flex-col justify-center text-center sm:mt-0 sm:text-left">
                              <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                                {post.title}
                              </p>
                              <p className="text-sm font-medium text-gray-600">
                                {post.artist.studioName}
                              </p>
                            </div>
                          </div>
                          <SocialMediaIcons {...post.artist} />
                        </div>
                      </div>
                      <div
                        className={`grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:divide-y-0 sm:divide-x ${sectionsGrid}`}
                      >
                        {post.categories.tattooStyle && (
                          <div className="px-6 py-5 text-center text-sm font-medium">
                            <span className="text-gray-900">Tattoo Style</span>
                            {post.categories.tattooStyle.map(
                              (tattooCategory) => (
                                <div key={tattooCategory.name} className="my-1">
                                  <span className="text-gray-600">
                                    {tattooCategory.name}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        )}
                        {post.categories.events && (
                          <div className="px-6 py-5 text-center text-sm font-medium">
                            <span className="text-gray-900">Attending</span>
                            {post.categories.events.map((event) => (
                              <div key={event.name} className="my-1">
                                <Link
                                  className="hover:font-bold"
                                  href={`/${category}/${event.name
                                    .toLowerCase()
                                    .replace(" ", "-")}`}
                                >
                                  <span className="text-gray-600">
                                    {event.name}
                                  </span>
                                </Link>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Images grid */}
                  <section aria-labelledby="arts-title">
                    <div className="gap-4 overflow-hidden shadow sm:grid sm:grid-cols-2">
                      <h2 className="sr-only" id="arts-title">
                        Arts
                      </h2>

                      {post.artist.images?.map((image, index) => (
                        <div
                          key={index}
                          className="group relative mb-2 h-96 rounded-md border-2 border-gray-800 hover:cursor-pointer hover:border-pink-300 lg:mb-0"
                          onClick={() => {
                            setImageRef(image.sourceUrl)
                            setOpen(true)
                          }}
                        >
                          <Image
                            fill
                            src={image.sourceUrl}
                            alt={image.altText || image.title || "Image"}
                            className="rounded-md object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </article>
          </>
        )}
      </Container>

      <Modal sourceUrl={imageRef} open={open} setOpen={setOpen} />
    </>
  )
}

export const getStaticProps = (async ({ params }) => {
  const { data } = await client.query<GetArtistProfile>({
    query: GET_ARTIST_PROFILE,
    variables: {
      id: params?.slug,
    },
  })

  return {
    props: {
      post: data.artist,
    },
    revalidate: 10,
  }
}) satisfies GetStaticProps

export const getStaticPaths: GetStaticPaths = async () => {
  const postType = "artists"
  const allPostsWithSlug = await getPostsWithSlug(postType)

  return {
    paths:
      allPostsWithSlug.edges.map(
        ({ node }: { node: { slug: string } }) =>
          `/${postType}/profile/${node.slug}`
      ) || [],
    fallback: true,
  }
}
