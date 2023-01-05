import Navbar from '@/components/Navbar'
import styles from '@/styles/Home.module.css'
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

      <h1 className="text-3xl font-bold underline">
        Whereas disregard and contempt for human rights have resulted
      </h1>

      <main className={`${styles.main} container`}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus ratione
          porro impedit obcaecati quo, non dolore accusamus, quisquam
          aspernatur, veritatis nulla culpa odit officia eos delectus neque
          architecto iure dolorum.
        </p>
      </main>
    </>
  )
}
