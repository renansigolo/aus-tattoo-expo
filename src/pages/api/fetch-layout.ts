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
  menuItems(where: {location: NAVIGATION_MENU}, first: 50) {
    nodes {
      key: id
      parentId
      url
      title: label
      path
      target
    }
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

  // Convert flat list to hierarchical list
  const flatListToHierarchical = (
    data = [],
    { idKey = "key", parentKey = "parentId", childrenKey = "children" } = {}
  ) => {
    const tree: any = []
    const childrenOf: any = {}
    data.forEach((item) => {
      const newItem = { ...(item as any) }
      const { [idKey]: id, [parentKey]: parentId = 0 } = newItem
      childrenOf[id] = childrenOf[id] || []
      newItem[childrenKey] = childrenOf[id]
      parentId
        ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
        : tree.push(newItem)
    })
    return tree
  }

  const hierarchicalList = flatListToHierarchical(data?.menuItems?.nodes as any)
  return res.status(200).json({ ...data, menu: hierarchicalList })
}
