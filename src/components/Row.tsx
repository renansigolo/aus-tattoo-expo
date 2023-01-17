import { classNames } from "@/lib/utils/cn"
import { ReactNode } from "react"

type ContainerProps = {
  children: ReactNode
  columns?: number
}

export function Row({ children, columns }: ContainerProps) {
  return (
    <div
      className={classNames(
        columns === 2 && `lg:grid-cols-2`,
        columns === 3 && `lg:grid-cols-3`,
        "grid grid-cols-1 gap-6"
      )}
    >
      {children}
    </div>
  )
}
