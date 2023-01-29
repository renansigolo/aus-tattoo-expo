const allowedImageWordPressDomain = new URL(process.env.WORDPRESS_API_URL)
  .hostname

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      allowedImageWordPressDomain,
      "tattooexpo.com.au",
      "placeholder.pics",
      "placehold.co",
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
