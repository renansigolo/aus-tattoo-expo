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
  __typename: string
}

type EventsContent = {
  featured: Featured[]
  __typename: string
}

type Featured = {
  id: string
  title: string
  slug: string
  acfFeaturedImage: AcfFeaturedImage
  artist: Artist
  __typename: FeaturedTypename
}

enum FeaturedTypename {
  Artist = "Artist",
}

type AcfFeaturedImage = {
  profileImage: ProfileImage
  __typename: AcfFeaturedImageTypename
}

enum AcfFeaturedImageTypename {
  ArtistAcffeaturedimage = "Artist_Acffeaturedimage",
}

type ProfileImage = {
  altText: AltText
  sourceUrl: string
  __typename: ProfileImageTypename
}

enum ProfileImageTypename {
  MediaItem = "MediaItem",
}

enum AltText {
  Empty = "",
  Troyslackink = "troyslackink",
}

type Artist = {
  studioName: string
  __typename: ArtistTypename
}

enum ArtistTypename {
  ArtistArtist = "Artist_Artist",
}

type Posts = {
  edges: Edge[]
  pageInfo: PageInfo
  __typename: string
}

type Edge = {
  node: Featured
  __typename: string
}

type PageInfo = {
  offsetPagination: OffsetPagination
  __typename: string
}

type OffsetPagination = {
  total: number
  __typename: string
}
