import { classNames } from "@/lib/utils/cn"
import Link from "next/link"
import Container from "./container"

type AlertProps = {
  preview?: boolean
}

export default function Alert({ preview }: AlertProps) {
  if (!preview) return null

  return (
    <div
      className={classNames("border-b", {
        "bg-accent-7 border-accent-7 text-white": preview,
        "bg-accent-1 border-accent-2": !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          <>
            This is a page preview.{" "}
            <Link
              href="/api/exit-preview"
              className="hover:text-cyan underline transition-colors duration-200"
            >
              Click here
            </Link>{" "}
            to exit preview mode.
          </>
        </div>
      </Container>
    </div>
  )
}
