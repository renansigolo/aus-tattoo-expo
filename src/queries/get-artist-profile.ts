import { gql } from "@apollo/client"

export const GET_ARTIST_PROFILE = gql`
  query GetArtistProfile($id: ID!) {
    artist(id: $id, idType: URI) {
      artist {
        studioName
        contactMobile
        contactEmail
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
