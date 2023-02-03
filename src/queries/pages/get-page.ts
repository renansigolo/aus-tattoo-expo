import { ImageFragment } from "@/queries/fragments/image"
import { SeoFragment } from "@/queries/fragments/seo"
import { gql } from "@apollo/client"

export const GET_PAGE_CONTENT = gql`
  ${SeoFragment}
  ${ImageFragment}
  query GetPageContent($uri: ID! = "/") {
    page(idType: URI, id: $uri) {
      isFrontPage
      title
      slug
      uri
      pageHeading {
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
      seo {
        ...SeoFragment
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
  }
`
