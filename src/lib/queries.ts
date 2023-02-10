import { fetchApi } from "@/lib/utils/fetch"
import { GetPostsWithSlug } from "src/io/interfaces/get-posts-with-slug"

export async function getPostsWithSlug(postType: "artists" | "retailers") {
  const data: GetPostsWithSlug = await fetchApi(
    `
    {
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
  )

  return data?.[postType]
}
