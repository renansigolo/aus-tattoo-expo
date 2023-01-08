import Boxes from '@/components/boxes'
import Cities from '@/components/cities'
import FeaturedArtists from '@/components/featured-artists'
import Hero from '@/components/hero/hero'
import Instagram from '@/components/instagram'
import Container from '@/components/wordpress/container'
import HeroPost from '@/components/wordpress/hero-post'
import MoreStories from '@/components/wordpress/more-stories'
import Footer from '@/layouts/footer'
import { getAllPostsForHome, getHomePageContent } from '@/lib/api'
import { GetStaticProps } from 'next'
import Head from 'next/head'

export default function Index({
  allPosts: { edges },
  homePageContent,
  preview,
}: any) {
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

      <Hero
        sourceUrl={homePageContent?.page?.featuredImage?.node?.sourceUrl}
        altText={homePageContent?.page?.featuredImage?.node?.altText}
      />

      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-gray-500">Divider</span>
        </div>
      </div>

      <Container>
        {/* <Intro /> */}
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
      {/* <Slider /> */}

      <Footer
        disclaimer={homePageContent?.footer?.disclaimer}
        copyright={homePageContent?.footer?.copyright}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview)
  const homePageContent = await getHomePageContent(preview)

  return {
    props: { allPosts, homePageContent, preview },
    revalidate: 10,
  }
}
