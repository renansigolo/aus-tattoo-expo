export type GetBoothsPage = {
  page: Page
}

type Page = {
  id: string
  title: string
  featuredImage: FeaturedImage
  content: null
}

type FeaturedImage = {
  node: Node
}

type Node = {
  sourceUrl: string
  altText: string
  title: string
}
