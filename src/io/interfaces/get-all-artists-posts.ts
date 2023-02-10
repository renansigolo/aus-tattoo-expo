export interface GetAllArtistsPosts {
  posts: Posts
}

export interface Posts {
  edges: Edge[]
  pageInfo: PageInfo
}

export interface Edge {
  node: Node
}

export interface Node {
  artist: Artist
  acfFeaturedImage: AcfFeaturedImage
  slug: string
  title: string
}

export interface AcfFeaturedImage {
  profileImage: ProfileImage
}

export interface ProfileImage {
  altText: string
  title: string
  sourceUrl: string
}

export interface Artist {
  studioName: string
}

export interface PageInfo {
  hasNextPage: boolean
  endCursor: string
}
