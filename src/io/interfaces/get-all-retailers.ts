export type GetAllRetailers = {
  retailers: RetailersProps
}

type RetailersProps = {
  nodes: Node[]
}

type Node = {
  retailer: Retailer
  acfFeaturedImage: AcfFeaturedImage
  slug: string
  title: string
}

type AcfFeaturedImage = {
  profileImage: ProfileImage
}

type ProfileImage = {
  altText: string
  sourceUrl: string
  title: string
}

type Retailer = {
  websiteUrl: string
}
