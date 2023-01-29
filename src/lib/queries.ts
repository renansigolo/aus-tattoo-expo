import { GetBoothsPage } from "@/interfaces/get-booths-page"
import { GetPostsWithSlug } from "@/interfaces/get-posts-with-slug"
import { fetchApi } from "@/lib/utils/fetch"

export async function getBoothsPage(id: string) {
  const data: GetBoothsPage = await fetchApi(
    `
    query Page {
      page(id: "${id}", idType: URI) {
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
  `,
    {
      variables: {
        id,
      },
    }
  )

  return data?.page
}

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
