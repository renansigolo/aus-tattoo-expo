import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

type SearchProps = {
  setSearch: (value: string) => void
}
export function Search({ setSearch }: SearchProps) {
  return (
    <div className="relative mx-auto mt-1 w-full rounded-md shadow-sm sm:w-1/3">
      <input
        type="text"
        name="search"
        id="search"
        className="block w-full rounded-md border-gray-300 pr-10 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Search an artist"
        onChange={(evt) => setSearch(evt.target.value)}
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <MagnifyingGlassIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
