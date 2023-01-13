import { LayoutQuery } from "@/interfaces/index"
import { fetchApi } from "@/lib/utils/fetch"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LayoutQuery>
) {
  const data = await fetchApi(
    `
    query GetLayout {
      menuItems(where: {location: NAVIGATION_MENU}) {
        nodes {
          title: label
          url
          path
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

  return res.status(200).json(data)
}
