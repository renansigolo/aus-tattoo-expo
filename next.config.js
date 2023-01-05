/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placeholder.pics', 'images.unsplash.com'],
  },
  // experimental: {
  //   fontLoaders: [
  //     { loader: "@next/font/google", options: { subsets: ["latin"] } },
  //   ],
  // },
}

module.exports = nextConfig
