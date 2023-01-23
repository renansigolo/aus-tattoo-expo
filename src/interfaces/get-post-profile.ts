export type GetPostProfile = {
  artist: PostProfileArtist
  retailer: PostProfileRetailer
}

type PostProfile = {
  acfFeaturedImage: AcfFeaturedImage
  title: string
  slug: string
  categories: Categories
}

type PostProfileArtist = PostProfile & {
  artist: ArtistDetails
}

type PostProfileRetailer = PostProfile & {
  retailer: PostDetails
}

type ArtistDetails = PostDetails & {
  studioName: string
}

type AcfFeaturedImage = {
  profileImage: Image
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

type PostDetails = {
  contactMobile: string
  contactEmail: string
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
