import { gql } from "@apollo/client"

export const GET_RETAILERS_BY_CATEGORY = gql`
  query GetRetailersByCategory(
    $first: Int
    $after: String
    $categoryName: String
    $id: ID!
  ) {
    posts: eventTaxonomy(id: $id, idType: SLUG) {
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
  }
`
