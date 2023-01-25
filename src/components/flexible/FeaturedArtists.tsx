import { CardImage } from "@/components/data-display/CardImage"
import { WPImage } from "@/lib/utils/types"

export type FeaturedArtist = {
  slug: string
  title: string
  acfFeaturedImage: {
    profileImage: WPImage
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
  if (!featuredArtists) return null

  return (
    <div className="my-8 text-center">
      <h2 className="mb-8 text-2xl font-bold uppercase text-white lg:text-4xl">
        Featured Artists
      </h2>
      <ul
        role="list"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
      >
        {featuredArtists.map((artist) => (
          <CardImage
            key={artist.slug}
            image={artist.acfFeaturedImage.profileImage}
            title={artist.title}
            description={artist.artist.studioName}
            uri={`/artists/profile/${artist.slug}`}
          />
        ))}
      </ul>
    </div>
  )
}
