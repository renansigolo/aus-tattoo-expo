import { GetPageProps } from "@/interfaces/get-page-content-query"
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
  `,
    {
      variables: {
        id,
      },
    }
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

type GetSiteOptions = {
  generalSettings: {
    title: string
    description: string
  }
}
export async function getSiteOptions(): Promise<GetSiteOptions> {
  const data = await fetchApi(
    `
  query HomePage {
    generalSettings {
      title
      description
    } 
  }
`
  )

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
          studioName
          contactNumber
          email
          websiteUrl
          twitterUrl
          facebookUrl
          instagramUrl
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

export async function getPageContent(uri: string) {
  const data: GetPageProps = await fetchApi(
    `
query PageContent($id: ID!) {
  page(idType: URI, id: $id) {
    title
    isFrontPage
    pageHeading {
      heroBanner {
        image {
          altText
          sourceUrl
          title
        }
      }
    }
    flexibleContent {
      components {
        ... on Page_Flexiblecontent_Components_HeroBanner {
          fieldGroupName
          heroBanner {
            image {
              altText
              sourceUrl
              title
            }
          }
        }
        ... on Page_Flexiblecontent_Components_YoutubeVideo {
          fieldGroupName
          youtubeVideo {
            videoUrl
          }
        }
        ... on Page_Flexiblecontent_Components_ContentEditor {
          fieldGroupName
          contentEditor {
            content
          }
        }
        ... on Page_Flexiblecontent_Components_Carousel {
          fieldGroupName
          carousel {
            images {
              altText
              sourceUrl
              title
            }
          }
        }
        ... on Page_Flexiblecontent_Components_Accordion {
          fieldGroupName
          accordion {
            items {
              title
              description
            }
          }
        }
        ... on Page_Flexiblecontent_Components_CtaBanner {
          fieldGroupName
          ctaBanner {
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
        }
        ... on Page_Flexiblecontent_Components_Expos {
          fieldGroupName
          expos {
            locations {
              date
              title
              url
              venue
            }
          }
        }
        ... on Page_Flexiblecontent_Components_Boxes {
          fieldGroupName
          boxes {
            items {
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
        ... on Page_Flexiblecontent_Components_Gallery {
          fieldGroupName
          gallery {
            columns
            images {
              altText
              title
              sourceUrl(size: LARGE)
            }
          }
        }
        ... on Page_Flexiblecontent_Components_Featured {
          fieldGroupName
          featured {
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
        }
        ... on Page_Flexiblecontent_Components_MultiColumns {
          fieldGroupName
          multiColumns {
            items {
              content
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
  for (const component of data?.page?.flexibleContent.components) {
    component.fieldGroupName = component.fieldGroupName
      .split("_")
      .pop() as string
  }

  return data?.page
}
