import { gql } from "@apollo/client"

export type GetTaxonomies = {
  eventTaxonomies: Taxonomies
  tattooTaxonomies: Taxonomies
}

type Taxonomies = {
  nodes: Node[]
}

type Node = {
  name: string
  slug: string
  uri: string
}

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
