export type GetTaxonomies = {
  eventTaxonomies: Taxonomies
  tattooTaxonomies: Taxonomies
}

type Taxonomies = {
  nodes: Node[]
}

type Node = {
  name: string
  slug: string
  uri: string
}
