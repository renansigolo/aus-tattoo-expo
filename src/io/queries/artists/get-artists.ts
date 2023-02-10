import { gql } from "@apollo/client"

export type GetArtists = {
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
  artist: Artist
  acfFeaturedImage: AcfFeaturedImage
  slug: string
  title: string
}

type AcfFeaturedImage = {
  profileImage: ProfileImage
}

type ProfileImage = {
  altText: string
  title: string
  sourceUrl: string
}

type Artist = {
  studioName: string
}

type PageInfo = {
  hasNextPage: boolean
  endCursor: string
}

export const GET_ARTISTS = gql`
  query GetArtists($first: Int, $after: String, $categoryName: String) {
    posts: artists(
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
          artist {
            studioName
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
