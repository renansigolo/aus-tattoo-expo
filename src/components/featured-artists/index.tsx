import { ArtistProfile } from "@/lib/legacy-api"
import Image from "next/image"
import Link from "next/link"
import style from "./featured-artists.module.scss"

type FeaturedArtistsProps = {
  featuredArtists: ArtistProfile[]
}

export default function FeaturedArtists({
  featuredArtists,
}: FeaturedArtistsProps) {
  if (!featuredArtists) return <></>

  return (
    <section className={style.section}>
      <h2>Melbourne Featured Artists</h2>
      <ul role="list">
        {featuredArtists.map((artist) => (
          <li key={artist.title}>
            <Link href={`/artist-profile/${artist.slug}`}>
              <article className={style.card}>
                <header>
                  <Image
                    src={artist.profileImg || "/images/no-image.svg"}
                    alt={artist.title}
                    width={120}
                    height={120}
                  />
                </header>
                <footer>
                  <h3>{artist.title}</h3>
                  <p>{artist.studioName}</p>
                </footer>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
