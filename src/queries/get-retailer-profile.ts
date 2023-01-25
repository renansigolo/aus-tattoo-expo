import { gql } from "@apollo/client"

export const GET_RETAILER_PROFILE = gql`
  query GetRetailerProfile($id: ID!) {
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
      link
      categories {
        events {
          name
        }
      }
    }
  }
`
