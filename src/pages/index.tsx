import Boxes from '@/components/boxes/boxes'
import Cities from '@/components/cities/cities'
import FeaturedArtists from '@/components/featured-artists/featured-artists'
import Instagram from '@/components/instagram/instagram'
import Container from '@/components/wordpress/container'
import HeroPost from '@/components/wordpress/hero-post'
import Intro from '@/components/wordpress/intro'
import MoreStories from '@/components/wordpress/more-stories'
import Footer from '@/layouts/footer/footer'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getAllPostsForHome } from 'src/lib/api'

export default function Index({ allPosts: { edges }, preview }: any) {
  const heroPost = edges[0]?.node
  const morePosts = edges.slice(1)

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

      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.featuredImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>

      <Cities />
      <FeaturedArtists />
      <Boxes />
      <Instagram />

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview)

  return {
    props: { allPosts, preview },
    revalidate: 10,
  }
}
