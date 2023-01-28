import { GetTaxonomies } from "@/interfaces/get-taxonomies"
import { GET_TAXONOMIES } from "@/queries/get-taxonomies"
import { useQuery } from "@apollo/client"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { SyntheticEvent } from "react"

type SearchFormProps = {
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
  setSelectedCategory: (selectedCategory: string) => void
  handleSearchFormSubmit: (event: SyntheticEvent) => void
}

export default function SearchForm({
  searchQuery,
  setSearchQuery,
  setSelectedCategory,
  handleSearchFormSubmit,
}: SearchFormProps) {
  const { data } = useQuery<GetTaxonomies>(GET_TAXONOMIES)
  const { tattooTaxonomies } = data || {}

  return (
    <form
      className="flex w-full flex-col items-center justify-center gap-4"
      onSubmit={handleSearchFormSubmit}
    >
      <div className="w-full sm:w-1/2">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            className="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
            placeholder="Search..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full sm:w-1/2">
        <select
          id="tattooStyle"
          name="tattooStyle"
          className="block w-full rounded-md border-transparent bg-gray-700 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          onChange={(evt) => setSelectedCategory(evt.target.value)}
        >
          <option value="">Category</option>
          {tattooTaxonomies?.nodes.map((node) => (
            <option key={node.name} value={node.name}>
              {node.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="submit"
        value="Search"
        className="btn-primary enabled:hover:cursor-pointer"
      />
    </form>
  )
}
