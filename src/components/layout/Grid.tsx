import { ReactNode } from "react"
import { classNames } from "src/utils/cn"

type GridProps = {
  children: ReactNode
  columns?: number
}

export function Grid({ children, columns }: GridProps) {
  return (
    <div
      className={classNames(
        columns === 2 && `lg:grid-cols-2`,
        columns === 3 && `sm:grid-cols-2 lg:grid-cols-3`,
        columns === 4 && `sm:grid-cols-3 lg:grid-cols-4`,
        columns === 5 && `sm:grid-cols-4 lg:grid-cols-5`,
        "grid grid-cols-1 gap-3 lg:gap-6"
      )}
    >
      {children}
    </div>
  )
}
