import style from './style.module.scss'

type City = {
  title: string
  date: string
  venue: string
  href: string
}

const cities: City[] = [
  {
    title: 'Sydney',
    date: 'April 1-3',
    venue: 'ICC',
    href: '#',
  },
  {
    title: 'Brisbane',
    date: 'July 15-17',
    venue: 'BCEC',
    href: '#',
  },
  {
    title: 'Perth',
    date: 'Sept 9-11',
    venue: 'PCEC',
    href: '#',
  },
  {
    title: 'Melbourne',
    date: 'Dec 2-4',
    venue: 'MCEC',
    href: '#',
  },
]

export default function Cities() {
  return (
    <section className={style.section}>
      <div className={style.cities}>
        <ul role="list">
          {cities.map(({ title, date, venue }) => (
            <li key={title}>
              <a>
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
