import { LoadMorePosts } from "@/components/posts/LoadMorePosts"
import { WPCategories } from "@/lib/utils/types"
import { GET_ARTISTS_BY_CATEGORY } from "@/queries/get-artists-by-category"
import { GET_RETAILERS } from "@/queries/get-retailers"

type EventsPostsProps = {
  posts: any
  category: WPCategories
  slug?: string
}

export function EventsPosts({ posts, category, slug }: EventsPostsProps) {
  const queryCategory =
    category === "artists" ? GET_ARTISTS_BY_CATEGORY : GET_RETAILERS

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
