import { ImageFragment } from "@/queries/fragments/image"
import { gql } from "@apollo/client"

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
