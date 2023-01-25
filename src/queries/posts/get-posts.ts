import { gql } from "@apollo/client"

/**
 * Get Artists Posts
 */
export const GET_ARTISTS_POSTS = gql`
  query GET_POSTS(
    $uri: ID!
    $first: Int
    $after: String
    $categoryName: String
  ) {
    page(id: $uri, idType: URI) {
      id
      title
      slug
      uri
      eventsContent {
        featured {
          ... on Artist {
            id
            title
            slug
            acfFeaturedImage {
              profileImage {
                altText
                sourceUrl
              }
            }
            artist {
              studioName
            }
          }
        }
      }
    }
    posts: artists(
      first: $first
      after: $after
      where: { categoryName: $categoryName }
    ) {
      edges {
        node {
          id
          slug
          title
          acfFeaturedImage {
            profileImage {
              sourceUrl(size: MEDIUM)
              altText
            }
          }
          artist {
            studioName
          }
        }
      }
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`

export const GET_TOTAL_POSTS_COUNT = gql`
  query GET_TOTAL_POSTS_COUNT {
    postsCount: posts {
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`

/**
 * Get post slugs.
 *
 */
export const GET_POST_SLUGS = gql`
  query GET_POST_SLUGS {
    posts: posts(last: 1) {
      nodes {
        id
        slug
      }
    }
  }
`
