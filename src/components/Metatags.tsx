import Head from "next/head"

type MetatagsProps = {
  title: string
  description: string
  imageUrl: string
}

export default function Metatags({
  title = "Australian Tattoo Expo",
  description = "Australian Tattoo Expo Website",
  imageUrl = "https://tattooexpo.com.au/favicons/social-banner.svg",
}: MetatagsProps) {
  return (
    <Head>
      <title>{title}</title>

      {/* MetaTags */}
      <meta title={title} />
      <meta content={description} name="description" />
      <meta content="tattoo, expo, australia" name="keywords" />
      <meta content="Renan Sigolo" name="author" />

      {/* Open Graph */}
      <meta content="website" property="og:type" />
      <meta content="https://tattooexpo.com.au/" property="og:url" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={imageUrl} property="og:image" />

      {/* Favicon */}
      <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      <link href="/favicon.ico" rel="icon" />

      {/* Manifest  */}
      <link href="/manifest.webmanifest" rel="manifest" />

      {/* Apple */}
      <link
        href="/favicons/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        color="#000000"
        href="/favicons/safari-pinned-tab.svg"
        rel="mask-icon"
      />
    </Head>
  )
}
