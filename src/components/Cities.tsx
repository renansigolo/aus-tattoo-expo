import style from '@/styles/Cities.module.css'

const cities = [
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
    <section className={`${style.section} section-container`}>
      <div>
        <ul role="list" className={style.list}>
          {cities.map(({ title, date, venue }) => (
            <li key={title}>
              <a className={style.item}>
                <span className={style.title}>{title}</span>
                <span>{date}</span>
                <span>
                  {venue},&nbsp;{title}
                </span>
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
