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
export async function getBoothsPageContent(id: string): Promise<PageContent> {
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

export async function getArtistsTags() {
  const data = await fetchApi(`
query GetAllArtistsTags {
  eventTaxonomies {
    nodes {
      id
      name
      slug
    }
  }
}
  `)

  return data
}

export async function getAllArtistsByEvent(
  slug: string | string[] | undefined
) {
  const data = await fetchApi(
    `
query GetArtistsByEvent($id: ID = "melbourne-2023") {
  eventTaxonomy(id: $id, idType: SLUG) {
    artists {
      edges {
        node {
          acfFeaturedImage {
            featuredImage {
              altText
              sourceUrl
              title
            }
          }
          slug
          title
          artist {
            studioName
          }
        }
      }
    }
    name
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

  return data
}

type GetHomePageContent = {
  generalSettings: {
    title: string
    description: string
  }
  page: {
    featuredImage: { node: WPImage }
    homePage: {
      featuredArtists: FeaturedArtist[]
    }
  }
}
export async function getHomePageContent() {
  const data: GetHomePageContent = await fetchApi(
    `
query HomePage {
  generalSettings {
    title
    description
 } 
}
`
  )

  return {
    siteIdentity: data.generalSettings,
  }
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
        categories {
          events {
            name
          }
          tattooStyle {
            name
          }
        }
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

export async function getPageContent(uri: string | string[] | undefined) {
  const data = await fetchApi(
    `
query PageContent($id: ID!) {
  page(idType: URI, id: $id) {
    title
    layout {
      rows {
        ... on Page_Layout_Rows_Row {
          components {
            ... on Page_Layout_Rows_Row_Components_HeroBanner {
              fieldGroupName
              image {
                altText
                sourceUrl
                title
              }
            }
            ... on Page_Layout_Rows_Row_Components_YoutubeVideo {
              fieldGroupName
              videoUrl
            }
            ... on Page_Layout_Rows_Row_Components_ContentEditor {
              content
              fieldGroupName
            }
            ... on Page_Layout_Rows_Row_Components_Carousel {
              fieldGroupName
              images {
                altText
                sourceUrl
                title
              }
            }
            ... on Page_Layout_Rows_Row_Components_Accordion {
              fieldGroupName
              items {
                title
                description
              }
            }
            ... on Page_Layout_Rows_Row_Components_CtaBanner {
              bannerType
              fieldGroupName
              text
              image {
                altText
                title
                sourceUrl
              }
              link {
                target
                title
                url
              }
            }
            ... on Page_Layout_Rows_Row_Components_Shows {
              fieldGroupName
              locations {
                venue
                url
                title
                date
              }
            }
            ... on Page_Layout_Rows_Row_Components_Featured {
              fieldGroupName
              featuredArtists {
                ... on Artist {
                  id
                  acfFeaturedImage {
                    featuredImage {
                      altText
                      title
                      sourceUrl
                    }
                  }
                  title
                  slug
                  artist {
                    studioName
                  }
                }
              }
            }
            ... on Page_Layout_Rows_Row_Components_Boxes {
              fieldGroupName
              boxes {
                image {
                  altText
                  title
                  sourceUrl
                }
                link {
                  url
                  title
                  target
                }
              }
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
        id: uri,
      },
    }
  )

  // Extract the last part of the fieldGroupName
  for (const row of data.page.layout.rows) {
    for (const component of row.components) {
      component.fieldGroupName = component.fieldGroupName.split("_").pop()
    }
  }

  return data.page
}
