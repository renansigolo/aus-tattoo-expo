import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { GetLayout } from "@/interfaces/get-layout"
import Head from "next/head"
import { ReactNode } from "react"
import useSWR, { Fetcher } from "swr"

type LayoutProps = {
  children: ReactNode
  // data: GetLayout
}
export default function Layout({ children }: LayoutProps) {
  const fetcher: Fetcher<GetLayout> = (url: string) =>
    fetch(url).then((res) => res.json())
  const { data, error } = useSWR<GetLayout>("/api/fetch-layout", fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Head>
        <title>{data.generalSettings.title}</title>
        <meta name="description" content={data.generalSettings.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        menuItems={data?.menuItems}
        siteIdentity={data?.acfOptionsGeneral.general.siteIdentity}
        generalSettings={data?.generalSettings}
      />

      <main>{children}</main>

      <Footer {...data?.acfOptionsFooter.footer} />
    </>
  )
}
