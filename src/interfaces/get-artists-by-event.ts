export type GetArtistsByEvent = {
  page: Page
  eventTaxonomy: EventTaxonomy
  tattooTaxonomies: TattooTaxonomies
}

type EventTaxonomy = {
  artists: Artists
  name: string
  slug: string
}

type Artists = {
  edges: Edge[]
}

type Edge = {
  node: EdgeNode
}

type EdgeNode = {
  acfFeaturedImage: AcfFeaturedImage
  slug: string
  title: string
  artist: Artist
}

type AcfFeaturedImage = {
  profileImage: ProfileImage
}

type ProfileImage = {
  altText: string
  sourceUrl: string
  title: string
}

type Artist = {
  studioName: string
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
  artist: Artist
}
