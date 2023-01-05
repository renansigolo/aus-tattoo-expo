import Boxes from '@/components/boxes/Boxes'
import Cities from '@/components/cities/Cities'
import FeaturedArtists from '@/components/featured-artists/FeaturedArtists'
import Instagram from '@/components/instagram/Instagram'
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

      {/* <Navbar /> */}

      <section className="grid h-9 place-content-center bg-red-300">
        <h2>NAVBAR</h2>
      </section>

      <section className="grid min-h-[50vh] place-content-center">
        {/* <img
          src="/images/hero-banner.jpg"
          alt="Hero Banner"
          className="w-full object-cover"
        /> */}
        <h1>HERO BANNER</h1>
      </section>

      <Cities />
      <FeaturedArtists />
      <Boxes />
      <Instagram />

      <Footer />
    </>
  )
}
