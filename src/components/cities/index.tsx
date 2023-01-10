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
            {events.map(({ title, date, venue, active, url }) => (
              <li key={title} className={active ? "text-white" : ""}>
                <Link href={url || "#"} target="_blank" rel="noreferrer">
                  <span>{title}</span>
                  {date}
                  <br />
                  {venue},&nbsp;{title}
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
