import { getLayoutQuery } from "@/lib/queries"
import { useQuery } from "@tanstack/react-query"
import { request } from "graphql-request"
import { ReactNode } from "react"
import Footer from "./footer"
import Navbar from "./navbar"

type LayoutProps = {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
  const { data } = useQuery({
    queryKey: ["layout"],
    queryFn: async () =>
      request("http://aus-tattoo-expo.local/graphql", getLayoutQuery, {
        first: 10,
      }),
  })

  return (
    <>
      <Navbar menuItems={data?.menuItems} />
      <main>{children}</main>
      <Footer {...data?.acfOptionsFooter?.footer} />
    </>
  )
}
