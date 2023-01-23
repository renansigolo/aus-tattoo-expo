export type GetTaxonomies = {
  eventTaxonomies: Taxonomy
  tattooStyleTaxonomies: Taxonomy
}

type Taxonomy = {
  nodes: Node[]
}

type Node = {
  name: string
  slug: string
}
