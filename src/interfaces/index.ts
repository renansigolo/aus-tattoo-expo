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
  key: string
  parentId: string | null
  path: string
  title: string
  urL: string
  target?: string | null
  chidren?: MenuItem[] | []
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
  menu: [
    {
      children: MenuItem[]
      key: string
      parentId: string | null
      path: string
      title: string
      urL: string
      target?: string | null
    }
  ]
}
