export type GetRetailers = {
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
  slug: string
  title: string
  link: string
  retailer: Retailer
  acfFeaturedImage: AcfFeaturedImage
}

type AcfFeaturedImage = {
  profileImage: ProfileImage
}

type ProfileImage = {
  altText: string
  title: string
  sourceUrl: string
}

type Retailer = {
  websiteUrl: null | string
}

type PageInfo = {
  hasNextPage: boolean
  endCursor: string
}
