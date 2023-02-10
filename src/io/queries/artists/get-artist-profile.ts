import { ImageFragment } from "@/io/queries/fragments/image"
import { SeoFragment } from "@/io/queries/fragments/seo"
import { WPImage } from "@/utils/wp-types"
import { gql } from "@apollo/client"

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
  ${ImageFragment}
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
          ...ImageFragment
          mediaDetails {
            width
            height
          }
        }
      }
      acfFeaturedImage {
        profileImage {
          ...ImageFragment
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
