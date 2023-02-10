import { CardImage } from "@/components/data-display/CardImage"
import { WPImage } from "src/utils/types"

export type FeaturedProfile = {
  slug: string
  title: string
  acfFeaturedImage: {
    profileImage: WPImage
  }
  artist: {
    studioName: string
    images: WPImage[] | null
  }
  retailer: {
    websiteUrl: string
    images: WPImage[] | null
  }
}

type FeaturedProps = {
  title?: string
  featuredProfiles: FeaturedProfile[]
}

export function Featured({
  title = "Featured",
  featuredProfiles,
}: FeaturedProps) {
  if (!featuredProfiles) return null

  const getCategory = (profile: FeaturedProfile) =>
    Object.keys(profile).includes("artist") ? "artists" : "retailers"

  return (
    <div className="my-8 text-center">
      <h2 className="mb-8 text-2xl font-bold uppercase text-white lg:text-4xl">
        {title}
      </h2>
      <ul
        role="list"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
      >
        {featuredProfiles.map((item) => (
          <CardImage
            key={item.slug}
            image={item.acfFeaturedImage.profileImage}
            title={item.title}
            description={item.artist?.studioName || item.retailer?.websiteUrl}
            uri={`/${getCategory(item)}/profile/${item.slug}`}
          />
        ))}
      </ul>
    </div>
  )
}
