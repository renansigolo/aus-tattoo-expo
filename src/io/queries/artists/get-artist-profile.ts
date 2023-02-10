import { gql } from "@apollo/client"
import { SeoFragment } from "src/io/queries/fragments/seo"

import { WPImage } from "src/utils/wp-types"

export type GetArtistProfile = {
  artist: GetArtistProfileArtist
}

type GetArtistProfileArtist = {
  seo: any
  artist: ArtistArtist
  acfFeaturedImage: AcfFeaturedImage
  title: string
  slug: string
  categories: Categories
}

type AcfFeaturedImage = {
  profileImage: WPImage
}

type Image = {
  altText: string
  title: string
  sourceUrl: string
  mediaDetails?: MediaDetails
}

type MediaDetails = {
  width: number
  height: number
}

type ArtistArtist = {
  studioName: string
  contactMobile: string
  websiteUrl: string
  twitterUrl: string
  facebookUrl: string
  instagramUrl: string
  images: Image[]
}

type Categories = {
  events: Event[]
  tattooStyle: Event[]
}

type Event = {
  name: string
}

export const GET_ARTIST_PROFILE = gql`
  ${SeoFragment}
  query GetArtistProfile($id: ID!) {
    artist(id: $id, idType: URI) {
      seo {
        ...SeoFragment
      }
      artist {
        studioName
        contactMobile
        websiteUrl
        twitterUrl
        facebookUrl
        instagramUrl
        images {
          altText
          sourceUrl(size: LARGE)
          title
          mediaDetails {
            width
            height
          }
        }
      }
      acfFeaturedImage {
        profileImage {
          altText
          title
          sourceUrl
        }
      }
      title
      slug
      categories {
        events {
          name
        }
        tattooStyle {
          name
        }
      }
    }
  }
`
