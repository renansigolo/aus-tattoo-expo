const API_URL = String(process.env.WORDPRESS_API_URL)

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers: HeadersInit = { "Content-Type": "application/json" }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch API")
  }
  return json.data
}

export async function getPreviewPost(id: any, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data.post
}

export type PageContent = {
  id: string
  title: string
  featuredImage: { sourceUrl: string; altText: string }
  content: string | null
}
export async function getPageContent(id: string): Promise<PageContent> {
  const data = await fetchAPI(
    `
query Page {
  page(id: "${id}", idType: URI) {
    id
    title
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    content
  }
}
  `
  )

  return {
    ...data.page,
    featuredImage: {
      sourceUrl: data.page.featuredImage.node.sourceUrl,
      altText: data.page.featuredImage.node.altText,
    },
  }
}

export async function getAllArtists() {
  const data = await fetchAPI(
    `
  query AllArtists {
    artists {
      edges {
        node {
          id
          title
          artists {
            contactNumber
            email
            fieldGroupName
            studioName
          }
          uri
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
  `
  )
  return data?.artists
}

export async function getFooterContent() {
  const data = await fetchAPI(`
  query Footer {
    siteOptions {
      options {
        footer {
          copyright
          disclaimer
        }
      }
    }
  }
  `)

  return data
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}

export async function getHomePageContent(preview: boolean) {
  const data = await fetchAPI(
    `
query HomePage {
  page(id: "/", idType: URI) {
    id
    content
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    homePage {
      eventsSection {
        eventsLocations {
          active
          date
          title
          venue
          url
        }
      }
    }
  }
  siteOptions {
    options {
      footer {
        copyright
        disclaimer
      }
    }
  }
}
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return {
    page: data?.page,
    events: data?.page?.homePage?.eventsSection?.eventsLocations,
    footer: data?.siteOptions?.options?.footer,
  }
}

export async function getAllPostsForHome(preview: boolean) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.posts
}

export async function getPostAndMorePosts(
  slug: string | string[] | undefined,
  preview: boolean,
  previewData: string | boolean | object | undefined | any
) {
  const postPreview = preview && previewData?.post
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug
  const isDraft = isSamePost && postPreview?.status === "draft"
  const isRevision = isSamePost && postPreview?.status === "publish"
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  )

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(
    ({ node }: any) => node.slug !== slug
  )
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop()

  return data
}
