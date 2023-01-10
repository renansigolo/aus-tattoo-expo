import { ReactNode } from "react"

type ContainerProps = {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <div className="container mx-auto max-w-5xl px-5">{children}</div>
}
