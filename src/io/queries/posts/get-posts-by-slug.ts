import { gql } from "@apollo/client"

export type GetPostsBySlug = {
  artists: Posts
  retailers: Posts
}

type Posts = {
  edges: Edge[]
}

type Edge = {
  node: Node
}

type Node = {
  slug: string
}

export const GET_POSTS_BY_SLUG = gql`
  query GetPostsBySlug {
    artists(first: 100) {
      edges {
        node {
          slug
        }
      }
    }
    retailers(first: 100) {
      edges {
        node {
          slug
        }
      }
    }
  }
`
