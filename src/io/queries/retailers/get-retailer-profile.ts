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
  query GetRetailerProfile($id: ID!) {
    retailer(id: $id, idType: URI) {
      retailer {
        contactMobile
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
      link
      categories {
        events {
          name
        }
      }
    }
  }
`
