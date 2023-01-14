import { SiteIdentity } from "@/components/Navbar"
import { WPImage } from "@/lib/utils/types"

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
  generalSettings: {
    title: string
    description: string
  }
  menuItems: {
    nodes: [
      {
        title: string
        url: string
        path: string
      }
    ]
  }
}
