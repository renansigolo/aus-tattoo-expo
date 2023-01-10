const API_URL = String(process.env.WORDPRESS_API_URL_LEGACY)

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers: HeadersInit = { "Content-Type": "application/json" }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  const res = await fetch(API_URL, {
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

export type FeaturedArtist = {
  title: string
  studioName: string
  profileImg: string
  slug: string
}

export type ArtistProfile = FeaturedArtist & {
  id: string
  contactEmail: string
  answer1: string
  answer2: string
  answer3: string
  facebookUrl: string
  instagramUrl: string
  twitterUrl: string
  websiteUrl: string
  uploadImage2: string
  uploadImage1: string
  categories: [{ id: string; name: string }]
  uri: string
}

type ArtistModule = {
  id: string
  title: string
}

export type Artists = {
  profiles: ArtistProfile[]
  modules: ArtistModule[]
}

type GetArtists = {
  artistProfiles: {
    nodes: ArtistProfile[]
  }
  artistsModules: {
    nodes: ArtistModule[]
  }
}

export async function getAllArtistsProfiles() {
  const data: GetArtists = await fetchAPI(
    `
query ArtistProfiles {
  artistProfiles(first: 10) {
    nodes {
      id
      title
      studioName
      contactEmail
      answer1
      answer2
      answer3
      facebookUrl
      instagramUrl
      twitterUrl
      websiteUrl
      uploadImage2
      uploadImage1
      profileImg
      categories {
        nodes {
          id
          name
        }
      }
      slug
      uri
    }
  }
  artistsModules {
    nodes {
      id
      title
    }
  }
}
  `
  )

  return {
    profiles: data.artistProfiles.nodes,
    modules: data.artistsModules.nodes,
  }
}

export async function getAllArtistsWithSlug() {
  const data = await fetchAPI(`
    {
      artistProfiles(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  return data?.artistProfiles
}

export async function getArtistProfile(slug: string | string[] | undefined) {
  const data = await fetchAPI(
    `
    query ArtistProfileBySlug($id: ID!) {
      artistProfile(id: $id, idType: URI) {
        id
        instagramUrl
        date
        slug
        title
      }
    }
  `,
    {
      variables: {
        id: slug,
      },
    }
  )

  return {
    post: data.artistProfile,
  }
}
