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
  target: string | null
  childItems: {
    edges: [
      {
        node: {
          path: string
          label: string
          target: string | null
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
