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
  gallery: Gallery
}

export interface Gallery {
  columns: number
  images: Image[]
}

export interface Image {
  altText: string
  title: string
  sourceUrl: string
}

export interface PageHeading {
  heroBanner: HeroBanner
}

export interface HeroBanner {
  image: null
}
