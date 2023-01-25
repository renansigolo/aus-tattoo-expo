import { SeverityIcon, SeverityProps } from "@/components/feedback/SeverityIcon"
import { ReactNode } from "react"

type AlertProps = SeverityProps & {
  title?: string
  children: ReactNode
}

export function Alert({ title, children, severity }: AlertProps) {
  const severityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return { text: "text-green-700", bgColor: "bg-green-100" }
      case "warning":
        return { text: "text-yellow-700", bgColor: "bg-yellow-100" }
      case "error":
        return { text: "text-red-700", bgColor: "bg-red-100" }

      default:
        return { text: "text-blue-700", bgColor: "bg-blue-100" }
    }
  }
  return (
    <div className={`rounded-md p-4 ${severityColor(severity).bgColor}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <SeverityIcon severity={severity} />
        </div>
        <div className="ml-3">
          {title && (
            <h3
              className={`text-sm font-medium ${severityColor(severity).text}`}
            >
              {title}
            </h3>
          )}

          <div className={`mt-2 text-sm ${severityColor(severity).text}`}>
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
