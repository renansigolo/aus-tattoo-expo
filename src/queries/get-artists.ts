import { gql } from "@apollo/client"

export const GET_ARTISTS = gql`
  query GET_ARTISTS($after: String) {
    posts: artists(first: 5, after: $after) {
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
