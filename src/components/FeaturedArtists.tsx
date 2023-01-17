import { CardImage } from "@/components/CardImage"
import { WPImage } from "@/lib/utils/types"

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

export function FeaturedArtists({ featuredArtists }: FeaturedArtistsProps) {
  if (!featuredArtists) return <></>
  return (
    <>
      <h2 className="lg:text-4xl; mb-8 text-2xl font-bold">Featured Artists</h2>
      <ul
        role="list"
        className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
      >
        {featuredArtists.map((artist) => (
          <CardImage
            key={artist.slug}
            image={artist.acfFeaturedImage.featuredImage}
            title={artist.title}
            description={artist.artist.studioName}
            url={`/artists/profile/${artist.slug}`}
          />
        ))}
      </ul>
    </>
  )
}
