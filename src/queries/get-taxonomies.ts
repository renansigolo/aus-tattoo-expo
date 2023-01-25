import { gql } from "@apollo/client"

export const GET_TAXONOMIES = gql`
  query GetTaxonomies {
    eventTaxonomies {
      nodes {
        name
        slug
        uri
      }
    }
    tattooTaxonomies {
      nodes {
        name
        slug
        uri
      }
    }
  }
`
