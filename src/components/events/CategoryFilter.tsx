import { GetTaxonomies, GET_TAXONOMIES } from "@/apollo/queries/get-taxonomies"
import { useQuery } from "@apollo/client"

export function CategoryFilter({ setFilter }: any) {
  const { data } = useQuery<GetTaxonomies>(GET_TAXONOMIES)
  const { tattooTaxonomies } = data || {}

  return (
    <div className="w-full sm:w-1/3">
      <select
        id="tattoo-style"
        name="tattoo-style"
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
