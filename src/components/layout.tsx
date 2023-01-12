import { getLayoutQuery } from "@/lib/queries"
import { useQuery } from "@tanstack/react-query"
import { request } from "graphql-request"
import { ReactNode } from "react"
import Footer from "./footer"
import Navbar from "./navbar"

const API_URL = process.env.WORDPRESS_API_URL as string

type LayoutQuery = {
  acfOptionsFooter: {
    footer: {
      copyright: string
      disclaimer: string
      sponsors: [
        {
          altText: string
          sourceUrl: string
          title: string
        }
      ]
    }
  }
  acfOptionsSocial: {
    socialMediaLinks: {
      facebook: string
      instagram: string
      twitter: string
    }
  }
  menuItems: {
    nodes: [
      {
        title: string
        url: string
        path: string
      }
    ]
  }
}

type LayoutProps = {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
  const { data } = useQuery<LayoutQuery>({
    queryKey: ["layout"],
    queryFn: async () =>
      request(API_URL, getLayoutQuery, {
        first: 10,
      }),
  })

  if (!data) return <></>
  const { menuItems, acfOptionsFooter } = data

  return (
    <>
      <Navbar menuItems={menuItems} />
      <main>{children}</main>
      <Footer {...acfOptionsFooter?.footer} />
    </>
  )
}
