export type WPImage = {
  sourceUrl: string
  altText?: string | null
  title?: string | null
  mediaDetails?: {
    width: string
    height: string
  }
}

export type WPLink = null | {
  target: string | ""
  title: string | ""
  url: string
}

export type WPCategories = "artists" | "retailers"
