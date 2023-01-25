import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"

export type SeverityProps = {
  severity: "success" | "warning" | "error" | "info"
}

export function SeverityIcon({ severity }: SeverityProps) {
  switch (severity) {
    case "success":
      return (
        <CheckCircleIcon
          className="h-6 w-6 text-green-400"
          aria-hidden="true"
        />
      )
    case "warning":
      return (
        <ExclamationTriangleIcon
          className="h-6 w-6 text-yellow-400"
          aria-hidden="true"
        />
      )
    case "error":
      return <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />

    default:
      return (
        <ExclamationCircleIcon
          className="h-6 w-6 text-blue-400"
          aria-hidden="true"
        />
      )
  }
}
