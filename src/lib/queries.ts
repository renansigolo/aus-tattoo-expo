import { GetAllArtists } from "@/interfaces/get-all-artists"
import { GetAllRetailers } from "@/interfaces/get-all-retailers"
import { GetArtistProfile } from "@/interfaces/get-artist-profile"
import { GetArtistsByEvent } from "@/interfaces/get-artists-by-event"
import { GetArtistsTaxonomies } from "@/interfaces/get-artists-taxonomies"
import { GetBoothsPage } from "@/interfaces/get-booths-page"
import { GetPageContent } from "@/interfaces/get-page-content"
import { GetPostProfile } from "@/interfaces/get-post-profile"
import { GetPostsByEvent } from "@/interfaces/get-posts-by-event"
import { GetPostsWithSlug } from "@/interfaces/get-posts-with-slug"
import { GetTaxonomies } from "@/interfaces/get-taxonomies"
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

export async function getAllRetailers() {
  const data: GetAllRetailers = await fetchApi(
    `
    query GetAllRetailers {
      retailers {
        nodes {
          retailer {
            websiteUrl
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

  return data?.retailers
}

export async function getAllArtists() {
  const data: GetAllArtists = await fetchApi(
    `
    query GetAllArtists {
      artists(first: 100) {
        nodes {
          artist {
            studioName
          }
          acfFeaturedImage {
            profileImage {
              altText
              sourceUrl(size: MEDIUM)
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

export async function getArtistsTaxonomies() {
  const data: GetArtistsTaxonomies = await fetchApi(
    `
query GetAllArtistsTags {
  eventTaxonomies {
    nodes {
      name
      slug
    }
  }
}
  `
  )

  return data
}

export async function getTaxonomies() {
  const data: GetTaxonomies = await fetchApi(
    `
query GetAllTaxonomies {
  eventTaxonomies {
    nodes {
      name
      slug
    }
  }
  tattooTaxonomies {
    nodes {
      name
      slug
    }
  }
}
  `
  )

  return data
}

export async function getArtistsByEvent(slug: string | string[] | undefined) {
  const data: GetArtistsByEvent = await fetchApi(
    `
query GetArtistsByEvent($id: ID!, $uri: ID!) {
  page(id: $uri, idType: URI) {
    id
    eventsContent {
      featured {
        ... on Artist {
          slug
          title
          uri
          acfFeaturedImage {
            profileImage {
              altText
              sourceUrl(size: MEDIUM)
              title
            }
          }
          artist {
            studioName
          }
        }
      }
    }
  }
  eventTaxonomy(id: $id, idType: SLUG) {
    artists(first: 50) {
      edges {
        node {
          acfFeaturedImage {
            profileImage {
              altText
              sourceUrl(size: MEDIUM)
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
  tattooTaxonomies {
    nodes {
      name
      taxonomyName
    }
  }
}
  `,
    {
      variables: {
        id: slug,
        uri: `/artists/${slug}`,
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

export async function getPostProfile(slug: string | string[] | undefined) {
  const artistQuery = `
  query PostContent($id: ID!) {
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
    `

  const retailerQuery = `
  query PostContent($id: ID!) {
      retailer(id: $id, idType: URI) {
        retailer {
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
    `
  const data: GetPostProfile = await fetchApi(retailerQuery, {
    variables: {
      id: slug,
    },
  })

  return data
}

export async function getPostsWithSlug(postType: "artists" | "retailers") {
  const data: GetPostsWithSlug = await fetchApi(
    `
    {
      artists(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
      retailers(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `
  )

  return data?.[postType]
}

export async function getPostsByEvent(
  slug: string | string[] | undefined,
  postType: "artists" | "retailers"
) {
  const retailersQuery = `
  query GetPostsByEvent($id: ID!, $uri: ID!) {
  page(id: $uri, idType: URI) {
    id
    eventsContent {
      featured {
        ... on Retailer {
          slug
          title
          uri
          acfFeaturedImage {
            profileImage {
              altText
              sourceUrl
              title
            }
          }
          retailer {
            websiteUrl
          }
        }
      }
    }
  }
  eventTaxonomy(id: $id, idType: SLUG) {
    name
    slug
    retailers {
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
          retailer {
            websiteUrl
          }
        }
      }
    }
  }
}
  `
  const data: GetPostsByEvent = await fetchApi(retailersQuery, {
    variables: {
      id: slug,
      uri: `/${postType}/${slug}`,
    },
  })

  return data
}
