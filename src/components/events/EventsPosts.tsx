import { LoadMorePosts } from "@/components/posts/LoadMorePosts"
import { GET_ARTISTS_BY_CATEGORY } from "@/queries/artists/get-artists-by-category"
import { GET_RETAILERS_BY_CATEGORY } from "@/queries/retailers/get-retailers-by-category"
import { WPCategories } from "src/utils/wp-types"

type EventsPostsProps = {
  posts: any
  category: WPCategories
  slug?: string
}

export function EventsPosts({ posts, category, slug }: EventsPostsProps) {
  const queryCategory =
    category === "artists" ? GET_ARTISTS_BY_CATEGORY : GET_RETAILERS_BY_CATEGORY

  return (
    <>
      <h2 className="mb-2 text-center text-3xl capitalize">
        {category} Attending
      </h2>
      <h3 className="mb-8 text-center text-lg text-gray-400">{posts?.name}</h3>
      <LoadMorePosts posts={posts} graphQLQuery={queryCategory} slug={slug} />
    </>
  )
}
