import { gql } from "@apollo/client"

export const GET_RETAILERS = gql`
  query GetRetailers($first: Int, $after: String) {
    posts: retailers(first: $first, after: $after) {
      edges {
        node {
          slug
          title
          link
          retailer {
            websiteUrl
          }
          acfFeaturedImage {
            profileImage {
              altText
              title
              sourceUrl(size: MEDIUM)
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
