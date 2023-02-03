import { LoadMorePosts } from "@/components/posts/LoadMorePosts"
import { WPCategories } from "@/lib/utils/types"
import { GET_ARTISTS } from "@/queries/get-artists"
import { GET_RETAILERS } from "@/queries/get-retailers"

type EventsPostsProps = {
  posts: any
  category: WPCategories
}

export function EventsPosts({ posts, category }: EventsPostsProps) {
  const queryCategory = category === "artists" ? GET_ARTISTS : GET_RETAILERS

  return (
    <>
      <h2 className="mb-2 text-center text-3xl capitalize">
        {category} Attending
      </h2>
      <h3 className="mb-8 text-center text-lg text-gray-400">{posts?.name}</h3>
      <LoadMorePosts posts={posts} graphQLQuery={queryCategory} />
    </>
  )
}
