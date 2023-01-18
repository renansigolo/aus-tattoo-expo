export type GetArtistProfile = {
  artist: GetArtistProfileArtist
}

type GetArtistProfileArtist = {
  artist: ArtistArtist
  acfFeaturedImage: AcfFeaturedImage
  title: string
  slug: string
  categories: Categories
}

type AcfFeaturedImage = {
  featuredImage: Image
}

type Image = {
  altText: string
  title: string
  sourceUrl: string
  mediaDetails?: MediaDetails
}

type MediaDetails = {
  width: number
  height: number
}

type ArtistArtist = {
  studioName: string
  contactNumber: number
  email: string
  websiteUrl: string
  twitterUrl: string
  facebookUrl: string
  instagramUrl: string
  images: Image[]
}

type Categories = {
  events: Event[]
  tattooStyle: Event[]
}

type Event = {
  name: string
}
