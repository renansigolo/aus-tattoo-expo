import style from './boxes.module.scss'

const boxContent = [
  {
    title: 'Retailers',
    pageUrl: '#',
    imageUrl: 'https://placeholder.pics/svg/1240',
  },
  {
    title: 'Entertainment',
    pageUrl: '#',
    imageUrl: 'https://placeholder.pics/svg/1240',
  },
  {
    title: 'Shop',
    pageUrl: '#',
    imageUrl: 'https://placeholder.pics/svg/1240',
  },
]

export default function Boxes() {
  return (
    <section className={style.section}>
      <div className={style.boxes}>
        {boxContent.map(({ title, pageUrl, imageUrl }) => (
          //   <a
          //     aria-label={title}
          //     className={style.card}
          //     href={pageUrl}
          //     rel="noopener noreferrer"
          //     target="_blank"
          //     key={title}
          //   >
          <div className={style.card} key={title}>
            <button className={style.cardTitle}>{title}</button>
            <img className={style.cardImage} src={imageUrl} alt={title} />
          </div>
          //   </a>
        ))}
      </div>
      <div className={style.tickets}>
        <button type="button">Buy Tickets</button>
      </div>
    </section>
  )
}
