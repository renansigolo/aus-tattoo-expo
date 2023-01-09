import "@/styles/globals.scss"
import { Open_Sans } from "@next/font/google"
import type { AppProps } from "next/app"

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${openSans.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}
