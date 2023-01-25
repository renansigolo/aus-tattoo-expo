export type GetRetailers = {
  posts: Posts
}

type Posts = {
  edges: Edge[]
  pageInfo: PageInfo
  __typename: string
}

type Edge = {
  node: Node
  __typename: string
}

type Node = {
  slug: string
  title: string
  link: string
  retailer: Retailer
  acfFeaturedImage: AcfFeaturedImage
  __typename: string
}

type AcfFeaturedImage = {
  profileImage: ProfileImage
  __typename: string
}

type ProfileImage = {
  altText: string
  title: string
  sourceUrl: string
  __typename: string
}

type Retailer = {
  websiteUrl: null | string
  __typename: string
}

type PageInfo = {
  hasNextPage: boolean
  endCursor: string
  __typename: string
}
