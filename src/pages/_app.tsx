import Layout from "@/components/layout"
import "@/styles/globals.css"

import { ApolloProvider } from "@apollo/client"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { Open_Sans } from "@next/font/google"
import localFont from "@next/font/local"
import type { AppProps } from "next/app"
import client from "src/apollo/client"

config.autoAddCss = false

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})

const lango = localFont({
  src: [
    {
      path: "../../public/fonts/lango.woff2",
      weight: "600",
      style: "normal",
    },
  ],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${openSans.variable} font-sans`}>
      <style jsx global>{`
        h1,
        h2 {
          font-family: ${lango.style.fontFamily};
        }
        .lango {
          font-family: ${lango.style.fontFamily};
        }
      `}</style>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </div>
  )
}
