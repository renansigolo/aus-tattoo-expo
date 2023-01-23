export type GetPostsWithSlug = {
  artists: Posts
  retailers: Posts
}

type Posts = {
  edges: Edge[]
}

type Edge = {
  node: Node
}

type Node = {
  slug: string
}
