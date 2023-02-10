import Link from "next/link"

const defaultLocations = {
  locations: [
    {
      upNext: true,
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
      upNext: null,
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
      upNext: null,
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
      upNext: null,
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
  upNext: boolean | null
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
        className="grid grid-cols-2 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {locations?.map((location, index) => (
          <li
            key={location.title}
            className={`${
              location.upNext && "text-white"
            } hover:cursor-pointer hover:text-white`}
          >
            <Link
              href={location.link?.url || "#"}
              target={location.link?.target || "_self"}
              rel="noreferrer"
              className="group flex h-full flex-col items-center justify-between justify-items-stretch text-center uppercase"
            >
              <div className="flex h-6 text-center">
                {location.upNext && <span className="w-full">Next up:</span>}
              </div>
              <span className="text-2xl font-bold lg:text-3xl">
                {location.title}
              </span>
              <div className="text-md lg:text-base">
                {location.date}
                <br />
                {location.venue}
              </div>

              <br />
              <button className="btn-primary mt-2 hidden grayscale-0 group-hover:grayscale-0 lg:grayscale">
                More Info
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
