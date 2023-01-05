import Cities from '@/components/Cities'
import { Navbar } from '@/components/Navbar'
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
    </>
  )
}
