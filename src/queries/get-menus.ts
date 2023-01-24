import { gql } from "@apollo/client"
import MenuFragment from "src/queries/fragments/menus"

export const HeaderFooter = `
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
  menuItems(where: {location: NAVIGATION_MENU, parentId: "0"}) {
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
`

export const GET_MENUS = gql`
query GET_MENUS {
  ${HeaderFooter}
}
  ${MenuFragment}
`
