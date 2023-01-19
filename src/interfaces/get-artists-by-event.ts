export type GetArtistsByEvents = {
  eventTaxonomy: EventTaxonomy
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
  node: Node
}

type Node = {
  acfFeaturedImage: AcfFeaturedImage
  slug: string
  title: string
  artist: Artist
}

type AcfFeaturedImage = {
  featuredImage: FeaturedImage
}

type FeaturedImage = {
  altText: string
  sourceUrl: string
  title: string
}

type Artist = {
  studioName: string
}