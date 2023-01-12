import { ReactNode } from "react"
import useSWR from "swr"
import Footer from "./footer"
import Navbar from "./navbar"

type LayoutProps = {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json())

  const { data, error } = useSWR("/api/fetch-layout", fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Navbar menuItems={data.menuItems} />
      <main>{children}</main>
      <Footer {...data.acfOptionsFooter?.footer} />
    </>
  )
}
