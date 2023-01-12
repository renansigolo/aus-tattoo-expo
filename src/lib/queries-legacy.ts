import { fetchApi } from "@/lib/utils/fetch"

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

export async function getFeaturedArtists() {
  const data: GetArtists = await fetchApi(
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
  `,
    {},
    true
  )

  return {
    profiles: data.artistProfiles.nodes,
    modules: data.artistsModules.nodes,
  }
}

export async function getAllArtistsWithSlug() {
  const data = await fetchApi(
    `
    {
      artistProfiles(first: 1000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `,
    {},
    true
  )

  return data?.artistProfiles
}

export async function getArtistProfile(slug: string | string[] | undefined) {
  const data = await fetchApi(
    `
    query ArtistProfileBySlug($id: ID!) {
      artistProfile(id: $id, idType: URI) {
        id
        instagramUrl
        title
        profileImg
        contactEmail
        contactMobile
        facebookUrl
        twitterUrl
        websiteUrl
        slug
        studioName
      }
    }
  `,
    {
      variables: {
        id: slug,
      },
    },
    true
  )

  return {
    post: data.artistProfile,
  }
}
