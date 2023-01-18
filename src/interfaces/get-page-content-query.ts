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
  multiColumns: MultiColumns
}

export interface MultiColumns {
  items: Item[]
}

export interface Item {
  content: string
}

export interface PageHeading {
  heroBanner: HeroBanner
}

export interface HeroBanner {
  image: Image
}

export interface Image {
  altText: string
  sourceUrl: string
  title: string
}
