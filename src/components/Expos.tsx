import Link from "next/link"

const defaultLocations = {
  locations: [
    {
      title: "Sydney",
      date: "April 1-3",
      venue: "ICC",
      url: "https://www.eventbrite.com.au/e/australian-tattoo-expo-sydney-2023-tickets-506941003187?aff=odcleoeventsincollection",
    },
    {
      title: "Brisbane",
      date: "July 15-17",
      venue: "BCEC",
      url: "https://www.eventbrite.com.au/e/australian-tattoo-expo-brisbane-2023-tickets-509740135467?aff=odcleoeventsincollection",
    },
    {
      title: "Perth",
      date: "Sept 9-11",
      venue: "PCEC",
      url: "https://www.eventbrite.com.au/e/australian-tattoo-expo-perth-2023-tickets-509749453337?aff=odcleoeventsincollection",
    },
    {
      title: "Melbourne",
      date: "Dec 2-4",
      venue: "MCEC",
      url: "https://www.eventbrite.com.au/e/australian-tattoo-expo-melbourne-2023-tickets-509750676997?aff=odcleoeventsincollection",
    },
  ],
}

export type EventLocation = {
  date: string
  title: string
  venue: string
  url: string | null
}

type ExposProps = {
  locations: EventLocation[] | null
}

export function Expos({ locations }: ExposProps) {
  if (!locations) {
    locations = defaultLocations.locations
  }

  return (
    <section className="py-5 text-gray-400">
      <ul
        role="list"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {locations?.map((location, index) => (
          <li
            key={location.title}
            className={`${
              index === 0 && "text-white"
            } hover:cursor-pointer hover:text-white`}
          >
            <Link
              href={location.url || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center text-center uppercase"
            >
              <div className="flex h-6 text-center">
                {index === 0 && <span className="w-full">Next up:</span>}
              </div>
              <span className="text-3xl font-bold">{location.title}</span>
              {location.date}
              <br />
              {location.venue},&nbsp;{location.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
