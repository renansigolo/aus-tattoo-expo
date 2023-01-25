import { gql } from "@apollo/client"

export const GET_ARTISTS_BY_EVENT = gql`
  query GetArtistsByEvent(
    $id: ID!
    $uri: ID!
    $first: Int
    $after: String
    $categoryName: String
  ) {
    page(id: $uri, idType: URI) {
      eventsContent {
        featured {
          ... on Artist {
            slug
            title
            uri
            acfFeaturedImage {
              profileImage {
                altText
                sourceUrl(size: MEDIUM)
                title
              }
            }
            artist {
              studioName
            }
          }
        }
      }
    }
    posts: eventTaxonomy(id: $id, idType: SLUG) {
      artists(
        first: $first
        after: $after
        where: { categoryName: $categoryName }
      ) {
        edges {
          node {
            slug
            title
            acfFeaturedImage {
              profileImage {
                altText
                sourceUrl(size: MEDIUM)
                title
              }
            }
            artist {
              studioName
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
      name
      slug
    }
    tattooTaxonomies {
      nodes {
        name
        taxonomyName
      }
    }
  }
`
