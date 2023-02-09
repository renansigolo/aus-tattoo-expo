export type GetArtistsByEvents = {
  page: Page
  posts: Posts
  tattooTaxonomies: TattooTaxonomies
}

type Page = {
  title: string
  slug: string
  uri: string
  eventsContent: EventsContent
  flexibleContent: FlexibleContent
  __typename: string
}

type EventsContent = {
  featured: null
  __typename: string
}

type FlexibleContent = {
  components: Component[]
  __typename: string
}

type Component = {
  fieldGroupName: string
  contentEditor: ContentEditor
  __typename: string
}

type ContentEditor = {
  content: string
  __typename: string
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
  node: EdgeNode
  __typename: string
}

type EdgeNode = {
  slug: string
  title: string
  acfFeaturedImage: AcfFeaturedImage
  artist: Artist
  __typename: string
}

type AcfFeaturedImage = {
  profileImage: ProfileImage
  __typename: string
}

type ProfileImage = {
  altText: string
  sourceUrl: string
  title: string
  __typename: string
}

type Artist = {
  studioName: string
  __typename: string
}

type PageInfo = {
  hasNextPage: boolean
  endCursor: string
  __typename: string
}

type TattooTaxonomies = {
  nodes: NodeElement[]
  __typename: string
}

type NodeElement = {
  name: string
  taxonomyName: TaxonomyName
  __typename: Typename
}

export enum Typename {
  TattooTaxonomy = "TattooTaxonomy",
}

export enum TaxonomyName {
  TattooStyle = "tattoo_style",
}
