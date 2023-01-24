import { gql } from "@apollo/client"

export const GET_ARTISTS = gql`
  query GetArtists($first: Int, $after: String, $categoryName: String) {
    posts: artists(
      first: $first
      after: $after
      where: { categoryName: $categoryName }
    ) {
      edges {
        node {
          artist {
            studioName
          }
          acfFeaturedImage {
            profileImage {
              altText
              title
              sourceUrl(size: MEDIUM)
            }
          }
          slug
          title
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
