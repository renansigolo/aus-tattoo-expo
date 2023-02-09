import { gql } from "@apollo/client"

export const GET_RETAILERS = gql`
  query GetRetailers($first: Int, $after: String, $categoryName: String) {
    posts: retailers(
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
