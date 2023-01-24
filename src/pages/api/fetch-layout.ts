import { GetLayout } from "@/interfaces/get-layout"
import { fetchApi } from "@/lib/utils/fetch"
import { NextApiRequest, NextApiResponse } from "next"
import { GET_LAYOUT } from "src/queries/get-layout"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: GetLayout = await fetchApi(GET_LAYOUT)
  return res.status(200).json(data)
}
