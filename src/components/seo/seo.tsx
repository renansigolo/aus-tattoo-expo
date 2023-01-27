import { NextSeo } from "next-seo"

export function Seo({ seo, uri }: any) {
  const {
    title,
    metaDesc,
    metaRobotsNoindex,
    metaRobotsNofollow,
    opengraphDescription,
    opengraphTitle,
    opengraphImage,
    opengraphSiteName,
  } = seo

  const currentLocation = process.browser ? window.location.origin : null
  const opengraphUrl =
    (process.env.NEXT_PUBLIC_NEXTJS_SITE_URL
      ? process.env.NEXT_PUBLIC_NEXTJS_SITE_URL
      : currentLocation) + uri

  return (
    <NextSeo
      title={title}
      description={opengraphDescription || metaDesc}
      canonical={opengraphUrl}
      noindex={"noindex" === metaRobotsNoindex}
      nofollow={"nofollow" === metaRobotsNofollow}
      openGraph={{
        type: "website",
        locale: "en_AU",
        url: opengraphUrl,
        title: opengraphTitle,
        description: opengraphDescription,
        images: [
          {
            url: opengraphImage?.sourceUrl,
            width: 1280,
            height: 720,
          },
        ],
        /* eslint-disable */
        site_name: opengraphSiteName,
        /* eslint-enable */
      }}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
    />
  )
}
