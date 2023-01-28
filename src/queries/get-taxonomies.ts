import { gql } from "@apollo/client"

export const GET_TAXONOMIES = gql`
  query GetTaxonomies {
    eventTaxonomies(first: 100) {
      nodes {
        name
        slug
        uri
      }
    }
    tattooTaxonomies(first: 100) {
      nodes {
        name
        slug
        uri
      }
    }
  }
`
