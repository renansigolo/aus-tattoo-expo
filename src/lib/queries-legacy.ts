import { fetchApi } from "@/lib/utils/fetch"
import { WPImage } from "@/lib/utils/types"

type GetArtistsBySlug = {
  artists: {
    edges: [
      {
        node: {
          slug: string
        }
      }
    ]
  }
}
export async function getAllArtistsWithSlug() {
  const data: GetArtistsBySlug = await fetchApi(
    `
    query GetArtistsBySlug {
      artists(first: 1000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `
  )

  return data?.artists
}

type GetArtistProfile = {
  artist: {
    artist: {
      website: string
      twitter: string
      studioName: string
      instagram: string
      contactNumber: string
      email: string
      facebook: string
      featuredImage: WPImage
    }
    title: string
    slug: string
  }
}
export async function getArtistProfile(slug: string | string[] | undefined) {
  const data: GetArtistProfile = await fetchApi(
    `
    query ArtistProfileBySlug($id: ID!) {
      artist(id: $id, idType: URI) {
        artist {
          website
          twitter
          studioName
          instagram
          contactNumber
          email
          facebook
          featuredImage {
            altText
            title
            sourceUrl
          }
        }
        title
        slug
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
    post: data?.artist,
  }
}
