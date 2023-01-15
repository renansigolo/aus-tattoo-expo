import { EventLocation } from "@/components/Cities"
import { FeaturedArtist } from "@/components/FeaturedArtists"
import { fetchApi } from "@/lib/utils/fetch"
import { WPImage } from "@/lib/utils/types"
import { ArtistProfileType } from "@/pages/artists/profile/[slug]"

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

type GetAllArtists = {
  artists: {
    nodes: [
      {
        node: ArtistProfileType
      }
    ]
  }
}

export async function getAllArtists() {
  const data: GetAllArtists = await fetchApi(
    `
    query GetAllArtists {
      artists {
        nodes {
          artist {
            studioName
          }
          acfFeaturedImage {
            featuredImage {
              altText
              sourceUrl
              title
            }
          }
          slug
          title
        }
      }
    }
  `
  )

  return data?.artists
}

type GetArtistsBySlug = {
  artists: {
    edges: [
      {
        node: {
          slug: string
        }
      }
    ]
  }
}
export async function getAllArtistsWithSlug() {
  const data: GetArtistsBySlug = await fetchApi(`
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
  generalSettings: {
    title: string
    description: string
  }
  page: {
    featuredImage: { node: WPImage }
    homePage: {
      youtubeUrl: string
      featuredArtists: FeaturedArtist[]
      carouselImages: WPImage[]
      heroBanner: WPImage
      events: {
        locations: EventLocation[]
      }
    }
  }
}
export async function getHomePageContent() {
  const data: GetHomePageContent = await fetchApi(
    `
query HomePage {
  page(id: "/", idType: URI) {
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
      carouselImages {
        altText
        title
        sourceUrl
      }
      heroBanner {
        altText
        sourceUrl
        title
      }
    }
  }
  generalSettings {
    title
    description
  }
}
`
  )

  return {
    heroBanner: data.page.homePage.heroBanner,
    carouselImages: data.page.homePage.carouselImages,
    youtubeVideoId: data.page.homePage.youtubeUrl,
    featuredArtists: data.page.homePage.featuredArtists,
    eventLocations: data.page.homePage.events.locations,
    siteIdentity: data.generalSettings,
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

type GetArtistProfile = {
  artist: ArtistProfileType
}
export async function getArtistProfile(slug: string | string[] | undefined) {
  const data: GetArtistProfile = await fetchApi(
    `
    query ArtistProfileBySlug($id: ID!) {
      artist(id: $id, idType: URI) {
        artist {
          website
          twitter
          studioName
          instagram
          contactNumber
          email
          facebook
          images {
            altText
            sourceUrl(size: LARGE)
            title
            mediaDetails {
              width
              height
            }
          }
        }
        acfFeaturedImage {
          featuredImage {
            altText
            title
            sourceUrl
          }
        }
        title
        slug
      }
    }
  `,
    {
      variables: {
        id: slug,
      },
    }
  )

  return {
    post: data?.artist,
  }
}

// export async function getAllPostsWithSlug() {
//   const data = await fetchApi(`
//     {
//       posts(first: 10000) {
//         edges {
//           node {
//             slug
//           }
//         }
//       }
//     }
//   `)
//   return data?.posts
// }

export async function getAllPagesWithUri() {
  const data = await fetchApi(`
    {
      pages(first: 10000) {
        edges {
          node {
            uri
          }
        }
      }
    }
  `)
  return data?.pages
}

export async function getPageContent(uri: string | string[] | undefined) {
  // query PageContent($id: ID!) {
  const data = await fetchApi(
    `
query PageContent($id: ID!) {
  page(id: $id, idType: URI) {
    title
    pageFlexibleContent {
      pageComponents {
        ... on Page_Pageflexiblecontent_PageComponents_HeroBanner {
          fieldGroupName
          image {
            altText
            title
            sourceUrl
          }
        }
        ... on Page_Pageflexiblecontent_PageComponents_YoutubeVideo {
          fieldGroupName
          videoUrl
        }
        ... on Page_Pageflexiblecontent_PageComponents_ContentEditor {
          content
          fieldGroupName
        }
        ... on Page_Pageflexiblecontent_PageComponents_Carousel {
          fieldGroupName
          images {
            altText
            sourceUrl
            title
          }
        }
      }
    }
  }
}
    `,
    {
      variables: {
        id: uri,
      },
    }
  )

  // Extract the last part of the fieldGroupName
  for (const pageComponent of data?.page?.pageFlexibleContent?.pageComponents) {
    pageComponent.fieldGroupName = pageComponent.fieldGroupName.split("_").pop()
  }

  return {
    title: data?.page?.title,
    pageFlexibleContent: data?.page?.pageFlexibleContent?.pageComponents,
  }
}
