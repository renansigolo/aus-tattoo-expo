import SearchForm from "@/components/search/SearchForm"
import { SyntheticEvent } from "react"

type SearchBoxProps = {
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
  handleSearchFormSubmit: (event: SyntheticEvent) => void
}

export function SearchBox({
  searchQuery,
  setSearchQuery,
  handleSearchFormSubmit,
}: SearchBoxProps) {
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 px-6">
      <div className="info mx-auto max-w-xl py-10">
        <br />
        <h2 className="py-4 text-center text-3xl font-bold uppercase text-white">
          Find an artist
        </h2>

        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchFormSubmit={handleSearchFormSubmit}
        />
      </div>
    </div>
  )
}
