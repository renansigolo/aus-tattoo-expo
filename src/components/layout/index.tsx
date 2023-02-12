import { GetLayout, GET_LAYOUT } from "@/apollo/queries/get-layout"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { useQuery } from "@apollo/client"
import Head from "next/head"
import { ReactNode } from "react"

type LayoutProps = {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
  const { error, data } = useQuery<GetLayout>(GET_LAYOUT)

  if (error) return <p>Error : {error.message}</p>
  if (!data) return <main>{children}</main>

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

      <Footer
        disclaimer={data?.acfOptionsFooter.footer.disclaimer}
        copyright={data?.acfOptionsFooter.footer.copyright}
        sponsors={data?.acfOptionsFooter.footer.sponsors}
        siteIdentity={data?.acfOptionsGeneral.general.siteIdentity}
      />
    </>
  )
}
