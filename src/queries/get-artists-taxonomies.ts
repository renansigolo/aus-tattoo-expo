import { gql } from "@apollo/client"

export const GET_ARTISTS_TAXONOMIES = gql`
  query GetArtistsTaxonomies {
    tattooTaxonomies {
      nodes {
        name
        slug
      }
    }
  }
`
