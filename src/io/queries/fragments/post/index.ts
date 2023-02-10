import { gql } from "@apollo/client"
import { ImageFragment } from "src/io/queries/fragments/image"

export const PostFragment = gql`
  ${ImageFragment}
  fragment PostFragment on Artist {
    id
    title
    slug
    acfFeaturedImage {
      profileImage {
        ...ImageFragment
      }
    }
  }
`
