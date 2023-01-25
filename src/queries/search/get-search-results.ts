import { PostFragment } from "@/queries/fragments/post"
import { gql } from "@apollo/client"

/**
 * Get Search Results.
 *
 */
export const GET_SEARCH_RESULTS = gql`
  ${PostFragment}
  query GET_SEARCH_RESULTS(
    $first: Int
    $after: String
    $query: String
    $categoryName: String
  ) {
    posts: artists(
      first: $first
      after: $after
      where: { search: $query, categoryName: $categoryName }
    ) {
      edges {
        cursor
        node {
          ...PostFragment
        }
      }
      pageInfo {
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
  ${PostFragment}
  query GET_SEARCH_RESULTS(
    $first: Int
    $after: String
    $query: String
    $categoryName: String
  ) {
    posts: artists(
      first: $first
      after: $after
      where: { search: $query, categoryName: $categoryName }
    ) {
      edges {
        cursor
        node {
          ...PostFragment
        }
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
