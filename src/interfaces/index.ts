import { SiteIdentity } from "@/interfaces/get-menus"
import { WPImage } from "@/lib/utils/types"

// export type SiteIdentity = {
//   logo: WPImage
//   facebookUrl: string
//   instagramUrl: string
//   twitterUrl: string
//   ticketsUrl: string
// }

export type GeneralSettings = {
  title: string
  description: string
}

export type MenuItem = {
  key: string
  parentId: string | null
  path: string
  title: string
  url: string | null
  target: string | null
  chidren?: MenuItem[] | []
}

export type LayoutQuery = {
  acfOptionsGeneral: {
    general: {
      siteIdentity: SiteIdentity
    }
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
      urL: string | null
      target: string | null
    }
  ]
}
