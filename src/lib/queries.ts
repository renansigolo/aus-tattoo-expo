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
