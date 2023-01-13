import Hero from "@/components/hero"
import Modal from "@/components/modal"
import Container from "@/components/wordpress/container"
import Layout from "@/components/wordpress/layout"
import PostTitle from "@/components/wordpress/post-title"
import { getAllArtistsWithSlug, getArtistProfile } from "@/lib/queries"
import { WPImage } from "@/lib/utils/types"
import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"
import { GetStaticPaths, GetStaticProps } from "next"
import ErrorPage from "next/error"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

const stats = [
  { label: "Events Attended", value: 12 },
  { label: "Tattos Made", value: 350 },
  { label: "Stars", value: 5 },
]
const actions = [
  {
    icon: ClockIcon,
    name: "Request time off",
    href: "#",
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    icon: CheckBadgeIcon,
    name: "Benefits",
    href: "#",
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    icon: UsersIcon,
    name: "Schedule a one-on-one",
    href: "#",
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    icon: BanknotesIcon,
    name: "Payroll",
    href: "#",
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    icon: ReceiptRefundIcon,
    name: "Submit an expense",
    href: "#",
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
  },
  {
    icon: AcademicCapIcon,
    name: "Training",
    href: "#",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
]

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

  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <div className="mb-6">
              <Hero {...post.acfFeaturedImage.featuredImage} />
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
                            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                              <p className="text-sm font-medium text-gray-600">
                                Artist Profile
                              </p>
                              <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                                {post.title}
                              </p>
                              <p className="text-sm font-medium text-gray-600">
                                {post.artist.studioName}
                              </p>
                            </div>
                          </div>
                          <div className="mt-5 flex justify-center sm:mt-0">
                            <a
                              href="#"
                              className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                              SOCIAL MEDIA ICONS HERE
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                        {stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="px-6 py-5 text-center text-sm font-medium"
                          >
                            <span className="text-gray-900">{stat.value}</span>{" "}
                            <span className="text-gray-600">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Actions panel */}
                  <section aria-labelledby="quick-links-title">
                    <div className="gap-4 overflow-hidden shadow sm:grid sm:grid-cols-2">
                      <h2 className="sr-only" id="quick-links-title">
                        Quick links
                      </h2>

                      {post.artist.images?.map((image, actionIdx) => (
                        <div
                          key={actionIdx}
                          className="group relative mb-2 h-96 rounded-md border-2 border-gray-600 hover:cursor-pointer hover:border-pink-300 lg:mb-0"
                          onClick={() => {
                            setImageRef(image.sourceUrl)
                            setOpen(true)
                          }}
                        >
                          <Image
                            src={image.sourceUrl}
                            alt={image.altText || image.title}
                            fill
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
    </Layout>
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
        ({ node }: any) => `/artists/profile/${node.slug}`
      ) || [],
    fallback: true,
  }
}
