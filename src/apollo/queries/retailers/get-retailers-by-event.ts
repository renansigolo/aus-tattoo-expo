import { ImageFragment } from "@/apollo/queries/fragments/image"
import { gql } from "@apollo/client"

export const GET_RETAILERS_BY_EVENT = gql`
  ${ImageFragment}
  query GetRetailersByEvent(
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
          ... on Retailer {
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
            retailer {
              websiteUrl
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
                ...ImageFragment
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
                ...ImageFragment
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
              imageCredits {
                instagramProfile {
                  target
                  title
                  url
                }
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
      retailers(
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
            retailer {
              websiteUrl
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
