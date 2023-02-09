import { HeroBannerProps } from "@/components/flexible/HeroBanner"

export type GetPageContent = {
  page: Page
}

type Page = {
  title: string
  isFrontPage: boolean
  pageHeading: PageHeading
  flexibleContent: FlexibleContent
  seo: any
  __typename: string
}

export type FlexibleContent = {
  components: FlexibleComponents[]
  __typename: string
}

export type FlexibleComponents = {
  fieldGroupName: string
  ctaBanner?: CtaBanner
  __typename: string
  youtubeVideo?: YoutubeVideo
  carousel?: Carousel
  expos?: Expos
  featured?: Featured
  boxes?: Boxes
}

type Boxes = {
  items: Item[]
  __typename: string
}

type Item = {
  image: Image
  link: Link
  __typename: string
}

type Image = {
  sourceUrl: string
  altText: AltText
  title: string
  __typename: Typename
}

export enum Typename {
  MediaItem = "MediaItem",
}

export enum AltText {
  Adamlynchtattoos = "adamlynchtattoos",
  Empty = "",
}

type Link = {
  url: string
  title: string
  target: string
  __typename: string
}

type Carousel = {
  images: Image[]
  __typename: string
}

type CtaBanner = {
  bannerType: string
  fieldGroupName: string
  text: null | string
  image: null
  link: Link
  __typename: string
}

type Expos = {
  useDefaultValues: boolean
  locations: null
  __typename: string
}

type Featured = {
  title: string
  featuredProfiles: FeaturedProfile[]
  __typename: string
}

type FeaturedProfile = {
  id: string
  acfFeaturedImage: AcfFeaturedImage
  title: string
  slug: string
  artist?: Artist
  __typename: string
  retailer?: Retailer
}

type AcfFeaturedImage = {
  profileImage: Image
  __typename: string
}

type Artist = {
  studioName: string
  __typename: string
}

type Retailer = {
  websiteUrl: string
  __typename: string
}

type YoutubeVideo = {
  videoUrl: string
  __typename: string
}

type PageHeading = {
  heroBanner: HeroBanner
  __typename: string
}

type HeroBanner = HeroBannerProps
