import "@/styles/globals.css"

import { Open_Sans } from "@next/font/google"
import Providers from "app/providers"
import { ReactNode } from "react"

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* <title>{data.generalSettings.title}</title>
      <meta name="description" content={data.generalSettings.description} /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body>
        <div className={`${openSans.variable} font-sans`}>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}
