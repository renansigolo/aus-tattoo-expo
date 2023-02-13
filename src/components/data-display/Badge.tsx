import { classNames } from "@/utils/cn"

export function Badge() {
  if (process.env.NODE_ENV === "production") return null

  const usingWordpressProd =
    process.env.NEXT_PUBLIC_SITE_URL === "https://wp.tattooexpo.com.au"

  return (
    <div className="fixed bottom-4 right-4">
      <span
        className={classNames(
          usingWordpressProd ? "text-red-800" : "text-blue-800",
          "inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium uppercase opacity-90"
        )}
      >
        {usingWordpressProd ? "Prod" : "Dev"}
      </span>
    </div>
  )
}
