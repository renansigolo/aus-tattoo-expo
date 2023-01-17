import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { LayoutQuery } from "@/interfaces/index"
import { ReactNode } from "react"
import useSWR, { Fetcher } from "swr"

type LayoutProps = {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
  const fetcher: Fetcher<LayoutQuery> = (url: string) =>
    fetch(url).then((res) => res.json())
  const { data, error } = useSWR<LayoutQuery>("/api/fetch-layout", fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Navbar
        menu={data.menu}
        siteIdentity={data.acfOptionsGeneral.siteIdentity}
        generalSettings={data.generalSettings}
      />
      <main>{children}</main>
      <Footer {...data.acfOptionsFooter?.footer} />
    </>
  )
}
