const API_URL = process.env.WORDPRESS_API_URL
const API_URL_LEGACY = process.env.WORDPRESS_API_URL_LEGACY

export async function fetchApi(
  query = "",
  { variables }: Record<string, any> = {},
  useLegacy: boolean = false
) {
  const apiUrl = useLegacy ? (API_URL_LEGACY as string) : (API_URL as string)
  const headers: HeadersInit = { "Content-Type": "application/json" }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  const res = await fetch(apiUrl, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch API")
  }
  return json.data
}
