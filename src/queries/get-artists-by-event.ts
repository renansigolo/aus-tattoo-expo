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
      title
      slug
      uri
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
      name
      slug
      artists(
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
    }
    tattooTaxonomies {
      nodes {
        name
        taxonomyName
      }
    }
  }
`
