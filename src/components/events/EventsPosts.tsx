import { GET_ARTISTS_BY_CATEGORY } from "@/apollo/queries/artists/get-artists-by-category"
import { GetTaxonomies, GET_TAXONOMIES } from "@/apollo/queries/get-taxonomies"
import { GET_RETAILERS_BY_CATEGORY } from "@/apollo/queries/retailers/get-retailers-by-category"
import { LoadMorePosts } from "@/components/posts/LoadMorePosts"
import { WPCategories } from "@/utils/wp-types"
import { useQuery } from "@apollo/client"
import { useState } from "react"

type EventsPostsProps = {
  posts: any
  category: WPCategories
  slug?: string
}

function CategoryFilter({ setFilter }: any) {
  const { data } = useQuery<GetTaxonomies>(GET_TAXONOMIES)
  const { tattooTaxonomies } = data || {}

  return (
    <div className="sm:w-1/3">
      <select
        id="tattooStyle"
        name="tattooStyle"
        className="block w-full rounded-md border-transparent bg-gray-700 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
        onChange={(evt) => setFilter(evt.target.value)}
      >
        <option value="">Filter by category</option>
        <option value="">All</option>
        {tattooTaxonomies?.nodes.map((node) => (
          <option key={node.name} value={node.name}>
            {node.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export function EventsPosts({ posts, category, slug }: EventsPostsProps) {
  const [filter, setFilter] = useState("")

  const queryCategory =
    category === "artists" ? GET_ARTISTS_BY_CATEGORY : GET_RETAILERS_BY_CATEGORY

  return (
    <>
      {category === "artists" && (
        <div className="mb-12 flex w-full justify-end">
          <CategoryFilter setFilter={setFilter} />
        </div>
      )}

      <h2 className="mb-2 text-center text-3xl capitalize">
        {category} Attending
      </h2>
      <h3 className="mb-8 text-center text-lg text-gray-400">{posts?.name}</h3>
      <LoadMorePosts
        posts={posts}
        graphQLQuery={queryCategory}
        slug={slug}
        filterCategory={filter}
      />
    </>
  )
}
