import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { SyntheticEvent } from "react"

const tattooTaxonomies = {
  nodes: [
    { name: "All" },
    { name: "Abstract" },
    { name: "Anime" },
    { name: "Apprentice" },
    { name: "Bio Mechanical" },
    { name: "Black and grey" },
    { name: "Blackwork" },
    { name: "Cosmetic" },
    { name: "Dotwork / Linework" },
    { name: "Featured" },
    { name: "Fine Line" },
    { name: "Floral" },
    { name: "Freehand" },
    { name: "Girls of Ink FInalists" },
    { name: "Handpoke" },
    { name: "Horror" },
    { name: "Japanese" },
    { name: "Location" },
    { name: "Brisbane" },
    { name: "Melbourne" },
    { name: "Perth" },
    { name: "Sydney" },
    { name: "Micro" },
    { name: "Neo-traditional" },
    { name: "New school" },
    { name: "Pin-up Pageant Winners" },
    { name: "Pinup Pageantry Finalists" },
    { name: "Pop Culture" },
    { name: "Realism" },
    { name: "Script" },
    { name: "Sullen Angels Finalist" },
    { name: "Traditional" },
    { name: "Tribal" },
    { name: "Watercolour" },
    { name: "Year" },
    { name: "2016" },
    { name: "2017" },
    { name: "2018" },
    { name: "2019" },
    { name: "2020" },
    { name: "2021" },
    { name: "2022" },
    { name: "2017 Judging Panel" },
  ],
}

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
          value={""}
          onChange={(evt) => setSelectedCategory(evt.target.value)}
        >
          <option value="">Category</option>
          {tattooTaxonomies.nodes.map((node) => (
            <option key={node.name} value={node.name}>
              {node.name}
            </option>
          ))}
        </select>
      </div>

      <input
        disabled={searchQuery.length < 3}
        type="submit"
        value="Search"
        className="btn-primary enabled:hover:cursor-pointer"
      />
    </form>
  )
}
