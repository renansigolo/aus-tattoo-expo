import { gql } from "@apollo/client"

export const GET_ARTISTS_BY_CATEGORY = gql`
  query GetArtistsByCategory(
    $first: Int
    $after: String
    $search: String
    $categoryName: String
    $id: ID!
  ) {
    posts: eventTaxonomy(id: $id, idType: SLUG) {
      artists(
        first: $first
        after: $after
        where: {
          search: $search
          categoryName: $categoryName
          orderby: { field: TITLE, order: ASC }
        }
      ) {
        edges {
          node {
            slug
            title
            link
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
  }
`
