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
          slug
          title
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
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
