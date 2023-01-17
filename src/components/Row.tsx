import { classNames } from "@/lib/utils/cn"
import { ReactNode } from "react"

type ContainerProps = {
  children: ReactNode
  col?: number
}

export function Row({ children, col }: ContainerProps) {
  return (
    <div
      className={classNames(
        col && `lg:grid-cols-${col}`,
        "grid grid-cols-1 gap-6"
      )}
    >
      {children}
    </div>
  )
}
