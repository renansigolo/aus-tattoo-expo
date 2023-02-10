export type GetPosts = {
  page: Page
  posts: Posts
}

type Page = {
  id: string
  title: string
  slug: string
  uri: string
  eventsContent: EventsContent
}

type EventsContent = {
  featured: Featured[]
}

type Featured = {
  id: string
  title: string
  slug: string
  acfFeaturedImage: AcfFeaturedImage
  artist: Artist
}

type AcfFeaturedImage = {
  profileImage: ProfileImage
}

type ProfileImage = {
  altText: AltText
  sourceUrl: string
}

enum AltText {
  Empty = "",
  Troyslackink = "troyslackink",
}

type Artist = {
  studioName: string
}

type Posts = {
  edges: Edge[]
  pageInfo: PageInfo
}

type Edge = {
  node: Featured
}

type PageInfo = {
  offsetPagination: OffsetPagination
}

type OffsetPagination = {
  total: number
}
