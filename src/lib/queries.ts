import { GetAllArtists } from "@/interfaces/get-all-artists"
import { GetArtistProfile } from "@/interfaces/get-artist-profile"
import { GetArtistsByEvents } from "@/interfaces/get-artists-by-event"
import { GetArtistsTaxonomies } from "@/interfaces/get-artists-taxonomies"
import { GetArtistsWithSlug } from "@/interfaces/get-artists-with-slug"
import { GetBoothsPage } from "@/interfaces/get-booths-page"
import { GetPageContent } from "@/interfaces/get-page-content"
import { fetchApi } from "@/lib/utils/fetch"

export async function getBoothsPage(id: string) {
  const data: GetBoothsPage = await fetchApi(
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

  return data?.page
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
            profileImage {
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

export async function getArtistsWithSlug() {
  const data: GetArtistsWithSlug = await fetchApi(`
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

export async function getArtistsTaxonomies() {
  const data: GetArtistsTaxonomies = await fetchApi(`
query GetAllArtistsTags {
  eventTaxonomies {
    nodes {
      name
      slug
    }
  }
}
  `)

  return data
}

export async function getArtistsByEvent(slug: string | string[] | undefined) {
  const data: GetArtistsByEvents = await fetchApi(
    `
query GetArtistsByEvent($id: ID!) {
  eventTaxonomy(id: $id, idType: SLUG) {
    artists {
      edges {
        node {
          acfFeaturedImage {
            profileImage {
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

export async function getArtistProfile(slug: string | string[] | undefined) {
  const data: GetArtistProfile = await fetchApi(
    `
    query ArtistProfileBySlug($id: ID!) {
      artist(id: $id, idType: URI) {
        artist {
          studioName
          contactMobile
          contactEmail
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
          profileImage {
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
  const data: GetPageContent = await fetchApi(
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
                sourceUrl
                altText
                title
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
                  profileImage {
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
