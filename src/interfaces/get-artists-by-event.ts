export type GetArtistsByEvent = {
  page: Page
  posts: Posts
  tattooTaxonomies: TattooTaxonomies
}

type Page = {
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
  slug: string
  title: string
  uri?: string
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
  altText: string
  sourceUrl: string
  title: string
  __typename: ProfileImageTypename
}

enum ProfileImageTypename {
  MediaItem = "MediaItem",
}

type Artist = {
  studioName: string
  __typename: ArtistTypename
}

enum ArtistTypename {
  ArtistArtist = "Artist_Artist",
}

type Posts = {
  name: string
  slug: string
  artists: Artists
  __typename: string
}

type Artists = {
  edges: Edge[]
  pageInfo: PageInfo
  __typename: string
}

type Edge = {
  node: Featured
  __typename: string
}

type PageInfo = {
  hasNextPage: boolean
  endCursor: string
  __typename: string
}

type TattooTaxonomies = {
  nodes: Node[]
  __typename: string
}

type Node = {
  name: string
  taxonomyName: TaxonomyName
  __typename: PurpleTypename
}

enum PurpleTypename {
  TattooTaxonomy = "TattooTaxonomy",
}

enum TaxonomyName {
  TattooStyle = "tattoo_style",
}
