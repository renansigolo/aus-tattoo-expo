import { CardImage } from "@/components/CardImage"
import { Container } from "@/components/Container"
import { getAllArtists } from "@/lib/queries"
import { WPImage } from "@/lib/utils/types"
import { GetStaticProps } from "next"

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
        <ul
          role="list"
          className="grid gap-3 text-center sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
        >
          {nodes.map((node) => (
            <li key={node.title}>
              <CardImage
                key={node.slug}
                image={node.acfFeaturedImage.featuredImage}
                title={node.title}
                description={node.artist.studioName}
                url={`/artists/profile/${node.slug}`}
              />
            </li>
          ))}
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
