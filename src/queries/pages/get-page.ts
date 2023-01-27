import { gql } from "@apollo/client"

export const GET_PAGE_CONTENT = gql`
  query GetPageContent($uri: ID! = "/") {
    page(idType: URI, id: $uri) {
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
              title
              featuredProfiles {
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
                ... on Retailer {
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
                  retailer {
                    websiteUrl
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
`
