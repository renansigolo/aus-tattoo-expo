import { gql } from "@apollo/client"

export type GetBoothsPage = {
  page: Page
}

type Page = {
  id: string
  title: string
  featuredImage: FeaturedImage
  content: null
}

type FeaturedImage = {
  node: Node
}

type Node = {
  sourceUrl: string
  altText: string
  title: string
}

export const GET_BOOTHS_PAGE = gql`
  query GetBoothsPage($id: ID!) {
    page(id: $id, idType: URI) {
      id
      title
      featuredImage {
        node {
          sourceUrl
          altText
          title
        }
      }
      content
    }
  }
`
