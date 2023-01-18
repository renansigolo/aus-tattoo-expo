export type GetPageContent = {
  page: Page
}

type Page = {
  title: string
  isFrontPage: boolean
  pageHeading: PageHeading
  flexibleContent: FlexibleContent
}

type FlexibleContent = {
  components: Component[]
}

type Component = {
  fieldGroupName: string
  multiColumns: MultiColumns
}

type MultiColumns = {
  items: Item[]
}

type Item = {
  content: string
}

type PageHeading = {
  heroBanner: HeroBanner
}

type HeroBanner = {
  image: Image
}

type Image = {
  altText: string
  sourceUrl: string
  title: string
}
