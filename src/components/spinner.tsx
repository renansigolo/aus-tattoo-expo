type SpinnerProps = {
  show: boolean
}

export default function Spinner({ show }: SpinnerProps) {
  return show ? <div className="spinner"></div> : null
}
