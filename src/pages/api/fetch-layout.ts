import { LayoutQuery } from "@/interfaces/index"
import { fetchApi } from "@/lib/utils/fetch"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LayoutQuery>
) {
  const data: LayoutQuery = await fetchApi(
    `
query GetLayout {
  menuItems(where: {location: NAVIGATION_MENU}) {
    nodes {
      title: label
      path
      childItems {
        edges {
          node {
            uri
            label
          }
        }
      }
      parentId
    }
  }
  acfOptionsGeneral {
    siteIdentity {
      logo {
        altText
        sourceUrl
      }
      facebook
      instagram
      twitter
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
  generalSettings {
    title
    description
  }
}
`
  )

  // Remove parent menu items which are actually children
  for (var i = 0; i < data.menuItems.nodes.length; i++) {
    if (data.menuItems.nodes[i].parentId !== null) {
      data.menuItems.nodes.splice(i, 1)
      i--
    }
  }

  return res.status(200).json(data)
}
