export type GetPostsByEvent = {
  page: Page
  eventTaxonomy: EventTaxonomy
  tattooTaxonomies: TattooTaxonomies
}

type EventTaxonomy = {
  artists: Edges
  retailers: Edges
  name: string
  slug: string
}

type Edges = {
  edges: Edge[]
}

type Edge = {
  node: EdgeNode
}

type EdgeNode = {
  acfFeaturedImage: AcfFeaturedImage
  slug: string
  title: string
  artist?: Post
  retailer?: Post
}

type AcfFeaturedImage = {
  profileImage: ProfileImage
}

type ProfileImage = {
  altText: string
  sourceUrl: string
  title: string
}

type Post = {
  studioName?: string
  websiteUrl?: string
}

type Page = {
  id: string
  eventsContent: EventsContent
}

type EventsContent = {
  featured: Featured[] | null
}

type TattooTaxonomies = {
  nodes: NodeElement[]
}

type NodeElement = {
  name: string
  taxonomyName: string
}

type Featured = {
  slug: string
  title: string
  uri: string
  acfFeaturedImage: AcfFeaturedImage
  artist: Post
  retailer: Post
}
