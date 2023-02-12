import { gql } from "@apollo/client"

export type GetRetailers = {
  posts: Posts
}

type Posts = {
  edges: Edge[]
  pageInfo: PageInfo
}

type Edge = {
  node: Node
}

type Node = {
  slug: string
  title: string
  link: string
  retailer: Retailer
  acfFeaturedImage: AcfFeaturedImage
}

type AcfFeaturedImage = {
  profileImage: ProfileImage
}

type ProfileImage = {
  altText: string
  title: string
  sourceUrl: string
}

type Retailer = {
  websiteUrl: null | string
}

type PageInfo = {
  hasNextPage: boolean
  endCursor: string
}

export const GET_RETAILERS = gql`
  query GetRetailers($first: Int, $after: String, $categoryName: String) {
    posts: retailers(
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
          link
          retailer {
            websiteUrl
          }
          acfFeaturedImage {
            profileImage {
              altText
              title
              sourceUrl(size: MEDIUM)
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
