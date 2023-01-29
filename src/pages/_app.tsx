import Layout from "@/components/layout"
import "@/styles/globals.css"

import { ApolloProvider } from "@apollo/client"
import { Open_Sans } from "@next/font/google"
import type { AppProps } from "next/app"
import client from "src/apollo/client"

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${openSans.variable} font-sans`}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </div>
  )
}
