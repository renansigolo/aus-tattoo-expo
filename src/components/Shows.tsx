import Link from "next/link"

export type EventLocation = {
  date: string
  title: string
  url: string
  venue: string
}

type ShowsProps = {
  locations: EventLocation[]
}

export function Shows({ locations }: ShowsProps) {
  if (!locations) return <></>

  // const month = new Date().toLocaleString("en-AU", { month: "short" })

  return (
    <section className="py-5 text-gray-400">
      <ul
        role="list"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {locations.map((event, index) => (
          <li
            key={event.title}
            className={`${
              index === 0 && "text-white"
            } hover:cursor-pointer hover:text-white`}
          >
            <Link
              href={event.url || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center text-center uppercase"
            >
              <div className="flex h-6 text-center">
                {index === 0 && <span className="w-full">Next up:</span>}
              </div>
              <span className="text-3xl font-bold">{event.title}</span>
              {event.date}
              <br />
              {event.venue},&nbsp;{event.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
