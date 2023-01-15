import Link from "next/link"

export default function BuyTickets({}) {
  return (
    <div className="my-6 flex justify-center">
      <Link
        href="https://www.eventbrite.com/cc/aus-tattoo-expo-2023-tour-1538659"
        target="_blank"
        className="btn-primary"
      >
        Buy Tickets
      </Link>
    </div>
  )
}
