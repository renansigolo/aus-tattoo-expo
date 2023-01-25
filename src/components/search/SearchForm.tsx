import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

type SearchFormProps = {
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
  handleSearchFormSubmit: (event: any) => void
}

export default function SearchForm({
  searchQuery,
  setSearchQuery,
  handleSearchFormSubmit,
}: SearchFormProps) {
  console.log("🚀 ~ searchQuery", searchQuery)
  return (
    <>
      <form
        className="flex w-full justify-center"
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
              id="search"
              name="search"
              className="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
              placeholder="Search..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <input type="submit" value="Search" className="btn-primary" />
      </form>
    </>
  )
}
