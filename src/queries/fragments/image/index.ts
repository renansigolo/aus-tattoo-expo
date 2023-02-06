import { gql } from "@apollo/client"

export const ImageFragment = gql`
  fragment ImageFragment on MediaItem {
    sourceUrl(size: LARGE)
    altText
    title
  }
`
