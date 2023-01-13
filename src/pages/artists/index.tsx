import { Grid } from "@/components/grid"
import Container from "@/components/wordpress/container"
import { getAllArtists } from "@/lib/queries"
import { WPImage } from "@/lib/utils/types"
import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"

type ArtistsProps = {
  nodes: [
    node: {
      artist: {
        studioName: string
      }
      acfFeaturedImage: {
        featuredImage: WPImage
      }
      title: string
      slug: string
    }
  ]
}
export default function Artists({ nodes }: ArtistsProps) {
  return (
    <section className="text-white">
      <Container>
        <h1 className="py-6 text-center text-3xl font-bold tracking-tight text-white sm:text-3xl">
          Meet the Artists
        </h1>
        <ul role="list" className="text-center">
          <Grid col={4}>
            {nodes.map((node) => (
              <li key={node.title}>
                <Link href={`/artists/profile/${node.slug}`}>
                  <article>
                    <header>
                      <Image
                        src={
                          node.acfFeaturedImage?.featuredImage.sourceUrl || ""
                        }
                        alt={node.title}
                        width={140}
                        height={140}
                      />
                    </header>
                    <footer>
                      <h3>{node.title}</h3>
                      <p>{node.artist.studioName}</p>
                    </footer>
                  </article>
                </Link>
              </li>
            ))}
          </Grid>
        </ul>
      </Container>
    </section>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllArtists()

  return {
    props: { ...data },
    revalidate: 10,
  }
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const allArtistsPosts = await getAllArtistsWithSlug()

//   return {
//     paths:
//       allArtistsPosts.edges.map(
//         ({ node }: any) => `/artists/profile/${node.slug}`
//       ) || [],
//     fallback: true,
//   }
// }
