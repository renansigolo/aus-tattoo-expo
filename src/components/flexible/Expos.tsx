import Link from "next/link"

const defaultLocations = {
  locations: [
    {
      title: "Sydney",
      date: "April 1-3",
      venue: "ICC",
      link: {
        url: "/artists/sydney-2022",
        target: "",
        title: "",
      },
    },
    {
      title: "Brisbane",
      date: "July 15-17",
      venue: "BCEC",
      link: {
        url: "/artists/brisbane-2022",
        target: "",
        title: "",
      },
    },
    {
      title: "Perth",
      date: "Sept 9-11",
      venue: "PCEC",
      link: {
        url: "/artists/perth-2022",
        target: "",
        title: "",
      },
    },
    {
      title: "Melbourne",
      date: "Dec 2-4",
      venue: "MCEC",
      link: {
        url: "/artists/melbourne-2022",
        target: "",
        title: "",
      },
    },
  ],
}

type LinkProps = {
  url: string
  title: string | ""
  target: string | ""
}

export type EventLocation = {
  date: string
  title: string
  venue: string
  link: LinkProps | null
}

type ExposProps = {
  useDefaultValues: boolean
  locations?: EventLocation[] | null
}

export function Expos({ locations, useDefaultValues }: ExposProps) {
  if (useDefaultValues) locations = defaultLocations.locations

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
              href={location.link?.url || "#"}
              target={location.link?.target || "_self"}
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
