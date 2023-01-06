import Boxes from '@/components/boxes'
import Cities from '@/components/cities'
import FeaturedArtists from '@/components/featured-artists'
import Instagram from '@/components/instagram'
import Container from '@/components/wordpress/container'
import HeroPost from '@/components/wordpress/hero-post'
import MoreStories from '@/components/wordpress/more-stories'
import Footer from '@/layouts/footer'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getAllPostsForHome, getHomePageContent } from 'src/lib/api'

export default function Index({
  allPosts: { edges },
  homePageContent,
  preview,
}: any) {
  console.log('🚀 ~ homePageContent', homePageContent)
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

      <section className="flex h-96 place-content-center">
        <img
          src={homePageContent?.featuredImage?.node?.sourceUrl}
          alt="Hero Banner"
          className="w-full object-cover"
        />
      </section>

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

      <Footer />
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
