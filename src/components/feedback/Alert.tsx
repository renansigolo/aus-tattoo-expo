import {
  SeverityIcon,
  SeverityProps,
} from "@/components/feedback/NotificationIcon"
import { ReactNode } from "react"

type AlertProps = SeverityProps & {
  title: string
  children: ReactNode
}

export function Alert({ title, children, severity }: AlertProps) {
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <SeverityIcon severity={severity} />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">{title}</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
