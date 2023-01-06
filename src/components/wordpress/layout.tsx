import { ReactNode } from 'react'
import Alert from './alert'
import Meta from './meta'

type LayoutProps = {
  preview?: boolean
  children: ReactNode
}

export default function Layout({ preview, children }: LayoutProps) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      {/* <Footer /> */}
    </>
  )
}
