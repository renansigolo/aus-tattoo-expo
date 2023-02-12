import { ImageFragment } from "@/apollo/queries/fragments/image"
import { gql } from "@apollo/client"

export type GetRetailerProfile = {
  retailer: GetRetailerProfileRetailer
}

type GetRetailerProfileRetailer = {
  retailer: RetailerRetailer
  acfFeaturedImage: AcfFeaturedImage
  title: string
  slug: string
  link: string
  categories: Categories
}

type AcfFeaturedImage = {
  profileImage: ProfileImage
}

type ProfileImage = {
  altText: string
  title: string
  sourceUrl: string
}

type Categories = {
  events: Event[]
}

type Event = {
  name: string
}

type Image = {
  altText: string
  title: string
  sourceUrl: string
}

type RetailerRetailer = {
  contactMobile: null
  websiteUrl: string
  twitterUrl: string
  facebookUrl: string
  instagramUrl: string
  images: Image[]
}

export const GET_RETAILER_PROFILE = gql`
  ${ImageFragment}
  query GetRetailerProfile($id: ID!) {
    retailer(id: $id, idType: URI) {
      retailer {
        contactMobile
        websiteUrl
        twitterUrl
        facebookUrl
        instagramUrl
        images {
          ...ImageFragment
          mediaDetails {
            width
            height
          }
        }
      }
      acfFeaturedImage {
        profileImage {
          ...ImageFragment
        }
      }
      title
      slug
      link
      categories {
        events {
          name
        }
      }
    }
  }
`
