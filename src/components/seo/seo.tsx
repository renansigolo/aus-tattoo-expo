import { NextSeo } from "next-seo"

type SeoProps = {
  seo: any
  uri?: string
}
export function Seo({ seo, uri }: SeoProps) {
  const {
    title,
    canonical,
    opengraphUrl,
    metaDesc,
    metaRobotsNoindex,
    metaRobotsNofollow,
    opengraphDescription,
    opengraphTitle,
    opengraphImage,
    opengraphSiteName,
  } = seo

  // const currentLocation = process.browser ? window.location.origin : null
  // const opengraphUrl =
  //   (process.env.NEXT_PUBLIC_VERCEL_URL
  //     ? process.env.NEXT_PUBLIC_VERCEL_URL
  //     : currentLocation) + uri

  return (
    <NextSeo
      title={title}
      description={opengraphDescription || metaDesc}
      canonical={canonical}
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
        handle: "@austattooexpo",
        site: "@austattooexpo",
        cardType: "summary_large_image",
      }}
    />
  )
}
