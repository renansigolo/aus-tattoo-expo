export type GetRetailerProfile = {
  retailer: GetRetailerProfileRetailer
}

type GetRetailerProfileRetailer = {
  retailer: RetailerRetailer
  acfFeaturedImage: AcfFeaturedImage
  title: string
  slug: string
  link: string
  categories: Categories
  __typename: string
}

type AcfFeaturedImage = {
  profileImage: ProfileImage
  __typename: string
}

type ProfileImage = {
  altText: string
  title: string
  sourceUrl: string
  __typename: string
}

type Categories = {
  events: Event[]
  __typename: string
}

type Event = {
  name: string
  __typename: string
}

type Image = {
  altText: string
  title: string
  sourceUrl: string
}

type RetailerRetailer = {
  contactMobile: null
  contactEmail: string
  websiteUrl: string
  twitterUrl: string
  facebookUrl: string
  instagramUrl: string
  images: Image[]
  __typename: string
}
