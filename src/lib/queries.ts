import { GetBoothsPage } from "@/interfaces/get-booths-page"
import { GetPageContent } from "@/interfaces/get-page-content"
import { GetPostsWithSlug } from "@/interfaces/get-posts-with-slug"
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

export async function getPostsWithSlug(postType: "artists" | "retailers") {
  const data: GetPostsWithSlug = await fetchApi(
    `
    {
      artists(first: 100) {
        edges {
          node {
            slug
          }
        }
      }
      retailers(first: 100) {
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
