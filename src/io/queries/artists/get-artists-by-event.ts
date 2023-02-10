import { ImageFragment } from "@/io/queries/fragments/image"
import { gql } from "@apollo/client"

export type GetArtistsByEvents = {
  page: Page
  posts: Posts
  tattooTaxonomies: TattooTaxonomies
}

type Page = {
  title: string
  slug: string
  uri: string
  eventsContent: EventsContent
  flexibleContent: FlexibleContent
}

type EventsContent = {
  featured: null
}

type FlexibleContent = {
  components: Component[]
}

type Component = {
  fieldGroupName: string
  contentEditor: ContentEditor
}

type ContentEditor = {
  content: string
}

type Posts = {
  name: string
  slug: string
  artists: Artists
}

type Artists = {
  edges: Edge[]
  pageInfo: PageInfo
}

type Edge = {
  node: EdgeNode
}

type EdgeNode = {
  slug: string
  title: string
  acfFeaturedImage: AcfFeaturedImage
  artist: Artist
}

type AcfFeaturedImage = {
  profileImage: ProfileImage
}

type ProfileImage = {
  altText: string
  sourceUrl: string
  title: string
}

type Artist = {
  studioName: string
}

type PageInfo = {
  hasNextPage: boolean
  endCursor: string
}

type TattooTaxonomies = {
  nodes: NodeElement[]
}

type NodeElement = {
  name: string
  taxonomyName: TaxonomyName
}

export enum Typename {
  TattooTaxonomy = "TattooTaxonomy",
}

export enum TaxonomyName {
  TattooStyle = "tattoo_style",
}

export const GET_ARTISTS_BY_EVENT = gql`
  ${ImageFragment}
  query GetArtistsByEvent(
    $id: ID!
    $uri: ID!
    $first: Int
    $after: String
    $categoryName: String
  ) {
    page(id: $uri, idType: URI) {
      title
      slug
      uri
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
      flexibleContent {
        components {
          ... on Page_Flexiblecontent_Components_HeroBanner {
            fieldGroupName
            heroBanner {
              useDefaultValues
              mobileImage {
                ...ImageFragment
              }
              image {
                ...ImageFragment
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
              mobileImage {
                ...ImageFragment
              }
              image {
                ...ImageFragment
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
              useDefaultValues
              locations {
                upNext
                date
                title
                venue
                link {
                  url
                  target
                  title
                }
              }
            }
          }
          ... on Page_Flexiblecontent_Components_Boxes {
            fieldGroupName
            boxes {
              items {
                image {
                  ...ImageFragment
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
              title
              featuredProfiles {
                ... on Artist {
                  id
                  acfFeaturedImage {
                    profileImage {
                      ...ImageFragment
                    }
                  }
                  title
                  slug
                  artist {
                    studioName
                  }
                }
                ... on Retailer {
                  id
                  acfFeaturedImage {
                    profileImage {
                      ...ImageFragment
                    }
                  }
                  title
                  slug
                  retailer {
                    websiteUrl
                  }
                }
              }
            }
          }
          ... on Page_Flexiblecontent_Components_TattooDetails {
            fieldGroupName
            tattooDetails {
              rowDirection
              title
              description
              mainImage {
                ...ImageFragment
              }
              images {
                ...ImageFragment
              }
              link {
                url
                title
                target
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
    posts: eventTaxonomy(id: $id, idType: SLUG) {
      name
      slug
      artists(
        first: $first
        after: $after
        where: {
          categoryName: $categoryName
          orderby: { field: TITLE, order: ASC }
        }
      ) {
        edges {
          node {
            slug
            title
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
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
    tattooTaxonomies {
      nodes {
        name
        taxonomyName
      }
    }
  }
`
