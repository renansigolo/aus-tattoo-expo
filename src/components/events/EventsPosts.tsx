import { GET_ARTISTS_BY_CATEGORY } from "@/apollo/queries/artists/get-artists-by-category"
import { GET_RETAILERS_BY_CATEGORY } from "@/apollo/queries/retailers/get-retailers-by-category"
import { CategoryFilter } from "@/components/events/CategoryFilter"
import { Search } from "@/components/events/Search"
import { LoadMorePosts } from "@/components/posts/LoadMorePosts"
import { WPCategories } from "@/utils/wp-types"
import { useState } from "react"

type EventsPostsProps = {
  posts: any
  category: WPCategories
  slug?: string
}

export function EventsPosts({ posts, category, slug }: EventsPostsProps) {
  const [filter, setFilter] = useState("")
  const [search, setSearch] = useState("")

  const queryCategory =
    category === "artists" ? GET_ARTISTS_BY_CATEGORY : GET_RETAILERS_BY_CATEGORY

  return (
    <>
      <h2 className="mb-2 text-center text-3xl capitalize">
        {category} Attending
      </h2>

      {/* Artists Filter */}
      {category === "artists" && (
        <>
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <p className="text-center text-sm font-medium text-gray-100">
              Choose a category or search the attending artists.
            </p>
            <Search setSearch={setSearch} />
            <CategoryFilter setFilter={setFilter} />
          </div>
        </>
      )}

      <h3 className="mb-8 text-center text-lg text-gray-400">{posts?.name}</h3>
      <LoadMorePosts
        slug={slug}
        posts={posts}
        searchQuery={search}
        filterCategory={filter}
        graphQLQuery={queryCategory}
      />
    </>
  )
}
