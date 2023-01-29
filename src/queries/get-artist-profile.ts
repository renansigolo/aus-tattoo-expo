import { SeoFragment } from "@/queries/fragments/seo"
import { gql } from "@apollo/client"

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
