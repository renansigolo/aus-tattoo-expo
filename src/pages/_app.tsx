import Layout from "@/components/layout"
import "@/styles/globals.css"
import { Open_Sans } from "@next/font/google"
import type { AppProps } from "next/app"

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${openSans.variable} font-sans`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
