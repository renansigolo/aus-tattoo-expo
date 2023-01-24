const allowedImageWordPressDomain = new URL(
  process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL
).hostname

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      allowedImageWordPressDomain,
      process.env.WORDPRESS_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
      "tattooexpo.com.au",
      "placeholder.pics",
      "placehold.co",
      "images.unsplash.com",
      "0.gravatar.com",
      "1.gravatar.com",
      "2.gravatar.com",
      "secure.gravatar.com",
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ]
  },
  // devIndicators: {
  //   buildActivity: true,
  // },
  // experimental: {
  //   fontLoaders: [
  //     {
  //       loader: "@next/font/google",
  //       options: { subsets: ["latin"], variable: "--font-open-sans" },
  //     },
  //   ],
  // },
}

module.exports = nextConfig
