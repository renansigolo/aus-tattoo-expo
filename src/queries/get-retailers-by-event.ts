import { gql } from "@apollo/client"

export const GET_RETAILERS_BY_EVENT = gql`
  query GetRetailersByEvent(
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
          ... on Retailer {
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
            retailer {
              websiteUrl
            }
          }
        }
      }
    }
    posts: eventTaxonomy(id: $id, idType: SLUG) {
      name
      slug
      retailers(
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
            retailer {
              websiteUrl
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
