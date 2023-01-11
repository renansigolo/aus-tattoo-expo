import { ReactNode } from "react"
import style from "./grid.module.scss"

type GridProps = {
  col?: number
  children: ReactNode
}

export function Grid({ col, children }: GridProps) {
  let gridStyle
  switch (col) {
    case 2:
      gridStyle = style.grid2
      break
    case 3:
      gridStyle = style.grid3
      break
    case 4:
      gridStyle = style.grid4
      break
    case 5:
      gridStyle = style.grid5
      break
    case 6:
      gridStyle = style.grid6
      break

    default:
      gridStyle = style.grid1
      break
  }
  return (
    <>
      <div className={gridStyle}>{children}</div>
    </>
  )
}
