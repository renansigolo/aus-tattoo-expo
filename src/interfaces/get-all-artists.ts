export type GetAllArtists = {
  artists: ArtistsProps
}

type ArtistsProps = {
  nodes: Node[]
}

type Node = {
  artist: Artist
  acfFeaturedImage: AcfFeaturedImage
  slug: string
  title: string
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
