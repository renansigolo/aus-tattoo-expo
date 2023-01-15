import { WPImage } from "@/lib/utils/types"
import Image from "next/image"
import Link from "next/link"

type ArtistCardProps = {
  title: string
  slug: string
  acfFeaturedImage: { featuredImage: WPImage }
  artist: { studioName: string; images: WPImage[] | null }
}
const ArtistCard = ({
  title,
  slug,
  acfFeaturedImage,
  artist,
}: ArtistCardProps) => {
  return (
    <li>
      <Link href={`/artists/profile/${slug}`}>
        <article className="flex h-full flex-col items-center justify-between rounded-sm p-2 hover:bg-primary-600">
          <header className="mb-2 aspect-square">
            <Image
              src={acfFeaturedImage.featuredImage?.sourceUrl}
              alt={
                acfFeaturedImage.featuredImage.altText ||
                acfFeaturedImage.featuredImage.title
              }
              width={140}
              height={140}
              className="rounded-sm object-cover lg:min-h-[160px] lg:min-w-[160px]"
            />
          </header>
          <footer>
            <h3 className="font-bold">{title}</h3>
            <p className="text-xs font-thin">{artist.studioName}</p>
          </footer>
        </article>
      </Link>
    </li>
  )
}

export type FeaturedArtist = {
  slug: string
  title: string
  acfFeaturedImage: {
    featuredImage: WPImage
  }
  artist: {
    studioName: string
    images: WPImage[] | null
  }
}

type FeaturedArtistsProps = {
  featuredArtists: FeaturedArtist[]
}

export default function FeaturedArtists({
  featuredArtists,
}: FeaturedArtistsProps) {
  if (!featuredArtists) return <></>
  return (
    <>
      <h2 className="lg:text-4xl; mb-8 text-2xl font-bold">Featured Artists</h2>
      <ul
        role="list"
        className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
      >
        {featuredArtists.map((artist) => (
          <ArtistCard key={artist.slug} {...artist} />
        ))}
      </ul>
    </>
  )
}
