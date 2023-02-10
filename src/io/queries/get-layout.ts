import { gql } from "@apollo/client"
import { MenuFragment } from "./fragments/menus"

export type GetLayout = {
  generalSettings: GeneralSettings
  acfOptionsGeneral: AcfOptionsGeneral
  menuItems: MenuItems
  acfOptionsFooter: AcfOptionsFooter
}

type AcfOptionsFooter = {
  footer: Footer
}

type Footer = {
  copyright: string
  disclaimer: string
  sponsors: Sponsor[]
}

type Sponsor = {
  sourceUrl: string
  title: string
  altText: string
}

type AcfOptionsGeneral = {
  general: General
}

type General = {
  siteIdentity: SiteIdentity
}

export type SiteIdentity = {
  logo: Sponsor
  facebookUrl: string
  instagramUrl: string
  twitterUrl: string
  ticketsUrl: string
}

type GeneralSettings = {
  title: string
  description: string
}

type Node = {
  id: string
  label: string
  url: string
  path: string
  target: string | null

  childItems?: MenuItems
}

type Edge = {
  node: Node
}

type MenuItems = {
  edges: Edge[]
}

export const GET_LAYOUT = gql`
  ${MenuFragment}
  query GetLayout {
    generalSettings {
      title
      description
    }
    acfOptionsGeneral {
      general {
        siteIdentity {
          logo {
            sourceUrl
            altText
            title
          }
          facebookUrl
          instagramUrl
          twitterUrl
          ticketsUrl
        }
      }
    }
    menuItems(where: { location: NAVIGATION_MENU, parentId: "0" }) {
      edges {
        node {
          ...MenuFragment
          childItems {
            edges {
              node {
                ...MenuFragment
              }
            }
          }
        }
      }
    }
    acfOptionsFooter {
      footer {
        copyright
        disclaimer
        sponsors {
          sourceUrl(size: THUMBNAIL)
          title
          altText
        }
      }
    }
  }
`