import { PostFragment } from "@/queries/fragments/post"
import { gql } from "@apollo/client"

/**
 * Get Search Results.
 *
 */
export const GET_SEARCH_RESULTS = gql`
  ${PostFragment}
  query GET_SEARCH_RESULTS($first: Int, $after: String, $query: String) {
    posts: artists(first: $first, after: $after, where: { search: $query }) {
      edges {
        node {
          id
          title
          slug
        }
        cursor
      }
      pageInfo {
        offsetPagination {
          total
        }
        hasNextPage
        endCursor
      }
    }
  }
`

/**
 * Get Search Results with Total Pages
 *
 */
export const GET_SEARCH_RESULTS_WITH_TOTAL_PAGES = gql`
  query GET_SEARCH_RESULTS($first: Int, $after: String, $query: String) {
    posts: artists(first: $first, after: $after, where: { search: $query }) {
      edges {
        node {
          id
          title
          slug
          acfFeaturedImage {
            profileImage {
              altText
              sourceUrl
            }
          }
        }
        cursor
      }
      pageInfo {
        offsetPagination {
          total
        }
        hasNextPage
        endCursor
      }
    }
  }
`
