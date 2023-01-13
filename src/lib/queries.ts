import { fetchApi } from "@/lib/utils/fetch"
import { WPImage } from "@/lib/utils/types"

export type PageContent = {
  id: string
  title: string
  featuredImage: WPImage
  content: string | null
}
export async function getWPPageContent(id: string): Promise<PageContent> {
  const data = await fetchApi(
    `
    query Page {
      page(id: "${id}", idType: URI) {
        id
        title
        featuredImage {
          node {
            sourceUrl
            altText
            title
          }
        }
        content
      }
    }
  `
  )

  return {
    ...data.page,
    featuredImage: {
      sourceUrl: data.page.featuredImage.node.sourceUrl,
      altText: data.page.featuredImage.node.altText,
    },
  }
}

export async function getAllArtists() {
  const data = await fetchApi(
    `
    query AllArtists {
      artists {
        edges {
          node {
            id
            title
            artists {
              contactNumber
              email
              fieldGroupName
              studioName
            }
            uri
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `
  )
  return data?.artists
}

export async function getAllArtistsWithSlug() {
  const data = await fetchApi(`
    {
      artists(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.artists
}

type GetHomePageContent = {
  page: {
    featuredImage: { node: WPImage }
    homePage: {
      youtubeUrl: string
      featuredArtists: [
        {
          slug: string
          title: string
          acfFeaturedImage: {
            featuredImage: WPImage
          }
          artist: {
            studioName: string
            images: null | WPImage[]
          }
        }
      ]
      sliderImages: WPImage[]
      events: {
        locations: [
          {
            active: boolean | null
            date: string
            title: string
            url: string
            venue: string
          }
        ]
      }
    }
  }
}
export async function getHomePageContent() {
  const data: GetHomePageContent = await fetchApi(
    `
query HomePage {
  page(id: "/", idType: URI) {
    featuredImage {
      node {
        sourceUrl
        altText
        title
      }
    }
    homePage {
      events {
        locations {
          active
          date
          title
          url
          venue
        }
      }
      featuredArtists {
        ... on Artist {
          artist {
            studioName
            images {
              altText
              sourceUrl
              title
            }
          }
          title
          slug
          acfFeaturedImage {
            featuredImage {
              altText
              title
              sourceUrl(size: THUMBNAIL)
            }
          }
        }
      }
      youtubeUrl
      sliderImages {
        altText
        title
        sourceUrl
      }
    }
  }
}
`
  )

  return {
    heroBanner: data.page.featuredImage.node,
    sliderImages: data.page.homePage.sliderImages,
    youtubeVideoId: data.page.homePage.youtubeUrl?.split("v=")[1],
    featuredArtists: data.page.homePage.featuredArtists,
    eventLocations: data.page.homePage.events.locations,
  }
}

export async function getAllPostsForHome(preview: boolean) {
  const data = await fetchApi(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.posts
}

export async function getPostAndMorePosts(
  slug: string | string[] | undefined,
  preview: boolean,
  previewData: string | boolean | object | undefined | any
) {
  const postPreview = preview && previewData?.post
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug
  const isDraft = isSamePost && postPreview?.status === "draft"
  const isRevision = isSamePost && postPreview?.status === "publish"
  const data = await fetchApi(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  )

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(
    ({ node }: any) => node.slug !== slug
  )
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop()

  return data
}

export const getLayoutQuery = `
query GetLayout {
  menuItems(where: {location: NAVIGATION_MENU}) {
    nodes {
      title: label
      url
      path
    }
  }
  acfOptionsFooter {
    footer {
      copyright
      disclaimer
      sponsors {
        sourceUrl(size: THUMBNAIL)
        title
        altText
      }
    }
  }
  acfOptionsSocial {
    socialMediaLinks {
      twitter
      instagram
      facebook
    }
  }
}
`
