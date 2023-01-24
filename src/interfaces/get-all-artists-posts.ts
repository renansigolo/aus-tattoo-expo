export interface GetAllArtistsPosts {
  posts: Posts
}

export interface Posts {
  edges: Edge[]
  pageInfo: PageInfo
  __typename: string
}

export interface Edge {
  node: Node
  __typename: string
}

export interface Node {
  artist: Artist
  acfFeaturedImage: AcfFeaturedImage
  slug: string
  title: string
  __typename: string
}

export interface AcfFeaturedImage {
  profileImage: ProfileImage
  __typename: string
}

export interface ProfileImage {
  altText: string
  title: string
  sourceUrl: string
  __typename: string
}

export interface Artist {
  studioName: string
  __typename: string
}

export interface PageInfo {
  hasNextPage: boolean
  endCursor: string
  __typename: string
}
