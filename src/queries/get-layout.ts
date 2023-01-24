import { gql } from "@apollo/client"
import { MenuFragment } from "./fragments/menus"

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
