import Container from "@/components/Container"
import HeroBanner from "@/components/HeroBanner"
import Modal from "@/components/Modal"
import { SocialMediaIcons } from "@/components/SocialMediaIcons"
import { getAllArtistsWithSlug, getArtistProfile } from "@/lib/queries"
import { WPImage } from "@/lib/utils/types"
import { GetStaticPaths, GetStaticProps } from "next"
import ErrorPage from "next/error"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

export type ArtistProfileType = {
  artist: {
    website: string
    twitter: string
    studioName: string
    instagram: string
    contactNumber: string
    email: string
    facebook: string
    images: WPImage[]
  }
  acfFeaturedImage: {
    featuredImage: WPImage
  }
  categories: {
    events: [{ name: string }]
    tattooStyle: [{ name: string }]
  }
  title: string
  slug: string
}

type ArtistProfileProps = {
  post: ArtistProfileType
}
export default function ArtistProfile({ post }: ArtistProfileProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [imageRef, setImageRef] = useState("")

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  console.log(post.categories.tattooStyle[0].name)
  return (
    <>
      <Container>
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <div className="mb-6 grid w-full justify-items-center">
              <div className="opacity-50">
                <HeroBanner {...post.acfFeaturedImage.featuredImage} />
              </div>
              <div className="absolute inline-grid items-center self-center text-center text-white">
                <h2 className="mb-1 text-5xl font-semibold">{post.title}</h2>
                <p className="text-xl">{post.artist.studioName}</p>
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
                                  post.acfFeaturedImage.featuredImage.sourceUrl
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
                          <SocialMediaIcons
                            instagram={post.artist?.instagram}
                            facebook={post.artist?.facebook}
                            twitter={post.artist?.twitter}
                            website={post.artist?.website}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
                        <div className="px-6 py-5 text-center text-sm font-medium">
                          <span className="text-gray-900">Tattoo Style</span>
                          {post.categories.tattooStyle.map((tattooCategory) => (
                            <div key={tattooCategory.name} className="my-1">
                              <span className="text-gray-600">
                                {tattooCategory.name}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="px-6 py-5 text-center text-sm font-medium">
                          <span className="text-gray-900">Attending</span>
                          {post.categories.events.map((event) => (
                            <div key={event.name} className="my-1">
                              <span className="text-gray-600">
                                {event.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Images grid */}
                  <section aria-labelledby="arts-title">
                    <div className="gap-4 overflow-hidden shadow sm:grid sm:grid-cols-2">
                      <h2 className="sr-only" id="arts-title">
                        Arts
                      </h2>

                      {post.artist.images?.map((image, actionIdx) => (
                        <div
                          key={actionIdx}
                          className="group relative mb-2 h-96 rounded-md border-2 border-gray-800 hover:cursor-pointer hover:border-pink-300 lg:mb-0"
                          onClick={() => {
                            setImageRef(image.sourceUrl)
                            setOpen(true)
                          }}
                        >
                          <Image
                            fill
                            src={image.sourceUrl}
                            alt={image.altText || image.title}
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getArtistProfile(params?.slug)

  return {
    props: {
      post: data.post,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allArtistsPosts = await getAllArtistsWithSlug()

  return {
    paths:
      allArtistsPosts.edges.map(
        ({ node }: { node: { slug: string } }) =>
          `/artists/profile/${node.slug}`
      ) || [],
    fallback: true,
  }
}
