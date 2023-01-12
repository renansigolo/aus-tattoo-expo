import Container from "@/components/wordpress/container"
import { WPImage } from "@/lib/utils/types"
import Image from "next/image"
import Link from "next/link"
import style from "./featured-artists.module.scss"

type FeaturedArtistsProps = {
  featuredArtists: [
    {
      slug: string
      title: string
      artist: {
        studioName: string
        images: WPImage[] | null
        featuredImage: WPImage
      }
    }
  ]
}

export default function FeaturedArtists({
  featuredArtists,
}: FeaturedArtistsProps) {
  if (!featuredArtists) return <></>
  return (
    <section className={style.section}>
      <Container>
        <h2>Featured Artists</h2>
        <ul role="list">
          {featuredArtists.map(({ title, slug, artist }) => (
            <li key={title}>
              <Link href={`/artists/profile/${slug}`}>
                <article className={style.card}>
                  <header>
                    <Image
                      src={artist.featuredImage?.sourceUrl}
                      alt={
                        artist.featuredImage.altText ||
                        artist.featuredImage.title
                      }
                      width={140}
                      height={140}
                    />
                  </header>
                  <footer>
                    <h3>{title}</h3>
                    <p>{artist.studioName}</p>
                  </footer>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
