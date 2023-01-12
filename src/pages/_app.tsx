import Layout from "@/components/layout"
import "@/styles/globals.scss"
import { Open_Sans } from "@next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${openSans.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </QueryClientProvider>
  )
}
