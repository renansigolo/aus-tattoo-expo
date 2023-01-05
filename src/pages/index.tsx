import Cities from '@/components/cities/Cities'
import FeaturedArtists from '@/components/featured-artists/FeaturedArtists'
import Navbar from '@/components/Navbar'
import Footer from '@/layouts/footer/Footer'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Australian Tattoo Expo</title>
        <meta name="description" content="Australian Tattoo Expo Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Cities />
      <FeaturedArtists />

      <Footer />
    </>
  )
}
