export type GetArtistsWithSlug = {
  artists: Artists
}

type Artists = {
  edges: Edge[]
}

type Edge = {
  node: Node
}

type Node = {
  slug: string
}
