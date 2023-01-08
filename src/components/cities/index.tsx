import style from './cities.module.scss'

type City = {
  active: boolean
  title: string
  date: string
  venue: string
  href: string
}

const cities: City[] = [
  {
    active: true,
    title: 'Sydney',
    date: 'April 1-3',
    venue: 'ICC',
    href: '#',
  },
  {
    active: false,
    title: 'Brisbane',
    date: 'July 15-17',
    venue: 'BCEC',
    href: '#',
  },
  {
    active: false,
    title: 'Perth',
    date: 'Sept 9-11',
    venue: 'PCEC',
    href: '#',
  },
  {
    active: false,
    title: 'Melbourne',
    date: 'Dec 2-4',
    venue: 'MCEC',
    href: '#',
  },
]

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
    <section className={style.section}>
      <div className={style.cities}>
        <ul role="list">
          {events.map(({ title, date, venue, active, url }) => (
            <li key={title} className={active ? 'text-white' : ''}>
              <a href={url} target="_blank" rel="noreferrer">
                <span>{title}</span>
                {date}
                <br />
                {venue},&nbsp;{title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={style.tickets}>
        <button type="button">Buy Tickets</button>
      </div>
    </section>
  )
}
