import { gql } from "@apollo/client"

export const SeoFragment = gql`
  fragment SeoFragment on PostTypeSEO {
    breadcrumbs {
      text
      url
    }
    title
    canonical
    metaDesc
    metaRobotsNoindex
    metaRobotsNofollow
    opengraphAuthor
    opengraphDescription
    opengraphTitle
    opengraphUrl
    opengraphImage {
      sourceUrl
    }
    opengraphSiteName
    opengraphPublishedTime
    opengraphModifiedTime
    twitterTitle
    twitterDescription
    twitterImage {
      sourceUrl
    }
  }
`
