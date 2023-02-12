import { ImageFragment } from "@/apollo/queries/fragments/image"
import { SeoFragment } from "@/apollo/queries/fragments/seo"
import { HeroBannerProps } from "@/components/flexible/HeroBanner"
import { gql } from "@apollo/client"

export type GetPageContent = {
  page: Page
}

type Page = {
  title: string
  isFrontPage: boolean
  pageHeading: PageHeading
  flexibleContent: FlexibleContent
  seo: any
}

export type FlexibleContent = {
  components: FlexibleComponents[]
}

export type FlexibleComponents = {
  fieldGroupName: string
  ctaBanner?: CtaBanner
  youtubeVideo?: YoutubeVideo
  carousel?: Carousel
  expos?: Expos
  featured?: Featured
  boxes?: Boxes
}

type Boxes = {
  items: Item[]
}

type Item = {
  image: Image
  link: Link
}

type Image = {
  sourceUrl: string
  altText: AltText
  title: string
}

export enum Typename {
  MediaItem = "MediaItem",
}

export enum AltText {
  Adamlynchtattoos = "adamlynchtattoos",
  Empty = "",
}

type Link = {
  url: string
  title: string
  target: string
}

type Carousel = {
  images: Image[]
}

type CtaBanner = {
  bannerType: string
  fieldGroupName: string
  text: null | string
  image: null
  link: Link
}

type Expos = {
  useDefaultValues: boolean
  locations: null
}

type Featured = {
  title: string
  featuredProfiles: FeaturedProfile[]
}

type FeaturedProfile = {
  id: string
  acfFeaturedImage: AcfFeaturedImage
  title: string
  slug: string
  artist?: Artist
  retailer?: Retailer
}

type AcfFeaturedImage = {
  profileImage: Image
}

type Artist = {
  studioName: string
}

type Retailer = {
  websiteUrl: string
}

type YoutubeVideo = {
  videoUrl: string
}

type PageHeading = {
  heroBanner: HeroBanner
}

type HeroBanner = HeroBannerProps

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
