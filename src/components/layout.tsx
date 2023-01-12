import { useQuery } from "@tanstack/react-query"
import { request } from "graphql-request"
import { ReactNode } from "react"
import Footer from "./footer"
import Navbar from "./navbar"

type LayoutProps = {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
  const query = `query MenuItems {
    menuItems(where: {location: NAVIGATION_MENU}) {
      nodes {
        key: id
        parentId
        title: label
        url
        path
      }
    }
  }`
  const { data } = useQuery({
    queryKey: ["menu"],
    queryFn: async () =>
      request("http://aus-tattoo-expo.local/graphql", query, { first: 10 }),
  })

  return (
    <>
      <Navbar menuItems={data?.menuItems} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
