import Boxes from '@/components/boxes'
import Cities from '@/components/cities'
import FeaturedArtists from '@/components/featured-artists'
import Hero from '@/components/hero/hero'
import Instagram from '@/components/instagram'
import Container from '@/components/wordpress/container'
import HeroPost from '@/components/wordpress/hero-post'
import MoreStories from '@/components/wordpress/more-stories'
import Footer from '@/layouts/footer'
import Navbar from '@/layouts/navbar/navbar'
import { SanitizeHtml } from '@/lib/helpers'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getAllPostsForHome, getHomePageContent } from 'src/lib/api'

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

      <Navbar />

      <Hero />

      <section>
        <div className="flex h-96 place-content-center">
          <Image
            width={1920}
            height={1080}
            alt={homePageContent?.featuredImage?.node?.altText}
            src={homePageContent?.featuredImage?.node?.sourceUrl}
            className="object-cover"
          />
          {/* <img
            src={homePageContent?.featuredImage?.node?.sourceUrl}
            alt={homePageContent?.featuredImage?.node?.altText}
            className="w-full object-cover"
          /> */}
        </div>
        <div className=" grid min-h-[20vh] place-content-center">
          <Container>
            <SanitizeHtml htmlString={homePageContent?.content} />
          </Container>
        </div>
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
