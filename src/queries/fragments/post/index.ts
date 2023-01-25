import { ImageFragment } from "@/queries/fragments/image"

export const PostFragment = `
 ${ImageFragment}
 fragment PostFragment on Post {
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
