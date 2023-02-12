import { PostFragment } from "@/apollo/queries/fragments/post"
import { gql } from "@apollo/client"

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
      where: {
        search: $query
        categoryName: $categoryName
        orderby: { field: TITLE, order: ASC }
      }
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

export const GET_SEARCH_RESULTS_WITH_TOTAL_PAGES = gql`
  ${PostFragment}
  query GET_SEARCH_RESULTS_WITH_TOTAL_PAGES(
    $first: Int
    $after: String
    $query: String
    $categoryName: String
  ) {
    posts: artists(
      first: $first
      after: $after
      where: {
        search: $query
        categoryName: $categoryName
        orderby: { field: TITLE, order: ASC }
      }
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
