import { gql } from "@apollo/client"

export const GET_ARTISTS_TAXONOMIES = gql`
  query GetArtistsTaxonomies {
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
