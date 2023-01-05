import style from './Boxes.module.scss'

const boxContent = [
  {
    title: 'Retailers',
    pageUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    title: 'Entertainment',
    pageUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    title: 'Shop',
    pageUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
