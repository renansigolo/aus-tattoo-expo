import Container from "@/components/wordpress/container"
import Link from "next/link"
import style from "./cities.module.scss"

type CitiesProps = {
  events: [
    {
      active: boolean | null
      date: string
      title: string
      venue: string
      url: string
    }
  ]
}

export default function Cities({ events }: CitiesProps) {
  return (
    <Container>
      <section className={style.section}>
        <div className={style.cities}>
          <ul role="list">
            {events.map((event) => (
              <li
                key={event.title}
                className={`${event.active && "text-white"}`}
              >
                <Link href={event.url || "#"} target="_blank" rel="noreferrer">
                  <div className="flex h-6 text-center">
                    {event.active && <span className="w-full">Next up:</span>}
                  </div>
                  <span>{event.title}</span>
                  {event.date}
                  <br />
                  {event.venue},&nbsp;{event.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={style.tickets}>
          <Link
            href={
              "https://www.eventbrite.com/cc/aus-tattoo-expo-2023-tour-1538659"
            }
            target="_blank"
          >
            Buy Tickets
          </Link>
        </div>
      </section>
    </Container>
  )
}
