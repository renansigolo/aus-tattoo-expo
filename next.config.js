/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "*", // lightsail server
      "tattoo-expo-test.local",
      "tattooexpo.com.au",
      "www.tattooexpo.com.au",
      "aus-tattoo-expo.local",
      "placeholder.pics",
      "images.unsplash.com",
      process.env.WORDPRESS_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
      "0.gravatar.com",
      "1.gravatar.com",
      "2.gravatar.com",
      "secure.gravatar.com",
    ],
  },
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
