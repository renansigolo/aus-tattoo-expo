export type GetArtistsTaxonomies = {
  eventTaxonomies: EventTaxonomies
}

type EventTaxonomies = {
  nodes: Node[]
}

type Node = {
  name: string
  slug: string
}
