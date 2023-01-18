// getPageContent Query
export interface GetPageProps {
  page: Page
}

export interface Page {
  title: string
  isFrontPage: boolean
  pageHeading: PageHeading
  flexibleContent: FlexibleContent
}

export interface FlexibleContent {
  components: Component[]
}

export interface Component {
  fieldGroupName: string
  ctaBanner?: CtaBanner
  videoUrl?: string
  images?: Image[]
  locations?: Location[]
  featuredArtists?: FeaturedArtist[]
  boxes?: Box[]
}

export interface Box {
  image: Image
  link: Link
}

export interface Image {
  altText: string
  title: string
  sourceUrl: string
}

export interface Link {
  url: string
  title: string
  target: string
}

export interface CtaBanner {
  bannerType: string
  text: null | string
  image: null
  link: Link | null
}

export interface FeaturedArtist {
  id: string
  acfFeaturedImage: AcfFeaturedImage
  title: string
  slug: string
  artist: Artist
}

export interface AcfFeaturedImage {
  featuredImage: Image
}

export interface Artist {
  studioName: string
}

export interface Location {
  date: string
  title: string
  url: string
  venue: string
}

export interface PageHeading {
  heroBanner: HeroBanner
}

export interface HeroBanner {
  image: null
}
