import { gql } from "@apollo/client"

export const GET_POST = gql`
  query GET_POST($uri: String) {
    post: postBy(uri: $uri) {
      id
      title
      content
      slug
      uri
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`

export const GET_POST_BY_ID = gql`
  query GET_POST_BY_ID($id: ID!) {
    post(idType: DATABASE_ID, id: $id) {
      id
      title
      content
      slug
      uri
      status
    }
  }
`
