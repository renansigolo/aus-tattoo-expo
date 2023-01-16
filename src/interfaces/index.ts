import { WPImage } from "@/lib/utils/types"

export type SiteIdentity = {
  logo: {
    altText: string
    sourceUrl: string
  }
  facebook: string
  instagram: string
  twitter: string
}

export type GeneralSettings = {
  title: string
  description: string
}

export type MenuItem = {
  title: string
  path: string
  parentId: string | null
  childItems: {
    edges: [
      {
        node: {
          uri: string
          label: string
        }
      }
    ]
  }
}

export type LayoutQuery = {
  acfOptionsGeneral: {
    siteIdentity: SiteIdentity
  }
  acfOptionsFooter: {
    footer: {
      copyright: string
      disclaimer: string
      sponsors: WPImage[]
    }
  }
  generalSettings: GeneralSettings
  menuItems: {
    nodes: MenuItem[]
  }
}
