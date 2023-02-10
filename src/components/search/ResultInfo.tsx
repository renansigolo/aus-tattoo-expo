import { classNames } from "src/utils/cn"

type ResultInfoProps = {
  totalPostResultCount: number
  showResultInfo: boolean
  classnames?: string
}

export function ResultInfo({
  totalPostResultCount,
  showResultInfo,
  classnames,
}: ResultInfoProps) {
  const resultText = `${totalPostResultCount} result${
    totalPostResultCount === 1 ? "" : "s"
  } found`

  return (
    <div className={classNames(classnames, { invisible: !showResultInfo })}>
      <h2 className="pt-2 text-center text-lg text-gray-300">{resultText}</h2>

      {0 === totalPostResultCount ? (
        <h2 className="pt-1 text-center text-lg text-gray-300">
          Please try another search
        </h2>
      ) : null}
    </div>
  )
}
