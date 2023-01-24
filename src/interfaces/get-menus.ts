export type GetMenus = {
  generalSettings: GeneralSettings
  acfOptionsGeneral: AcfOptionsGeneral
  menuItems: MenuItems
  acfOptionsFooter: AcfOptionsFooter
}

type AcfOptionsFooter = {
  footer: Footer
  __typename: string
}

type Footer = {
  copyright: string
  disclaimer: string
  sponsors: Sponsor[]
  __typename: string
}

type Sponsor = {
  sourceUrl: string
  title: string
  altText: string
  __typename: string
}

type AcfOptionsGeneral = {
  general: General
  __typename: string
}

type General = {
  siteIdentity: SiteIdentity
  __typename: string
}

export type SiteIdentity = {
  logo: Sponsor
  facebookUrl: string
  instagramUrl: string
  twitterUrl: string
  ticketsUrl: string
  __typename: string
}

type GeneralSettings = {
  title: string
  description: string
  __typename: string
}

type Node = {
  id: string
  label: string
  url: string
  path: string
  target: string | null

  __typename: NodeTypename
  childItems?: MenuItems
}

type Edge = {
  node: Node
  __typename: EdgeTypename
}

type MenuItems = {
  edges: Edge[]
  __typename: string
}

enum NodeTypename {
  MenuItem = "MenuItem",
}

enum EdgeTypename {
  MenuItemToMenuItemConnectionEdge = "MenuItemToMenuItemConnectionEdge",
  RootQueryToMenuItemConnectionEdge = "RootQueryToMenuItemConnectionEdge",
}
