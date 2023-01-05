import style from './FeaturedArtists.module.scss'

type FeaturedArtist = {
  name: string
  studio: string
  imageUrl: string
}

const featuredArtists: FeaturedArtist[] = [
  {
    name: 'Eric Gordon',
    studio: 'The Black Mark',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Carly Kawaii',
    studio: 'Justat tattoo supplies',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Matt Curzon',
    studio: 'Empire',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Lindsay Walton',
    studio: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  {
    name: 'Lindsay Walton',
    studio: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
]

export default function FeaturedArtists() {
  return (
    <section className={style.section}>
      <h2>Melbourne Featured Artists</h2>
      <ul role="list">
        {featuredArtists.map(({ name, imageUrl, studio }) => (
          <li key={name}>
            <article className={style.card}>
              <header>
                <img src={imageUrl} alt="Artist Image" />
              </header>
              <footer>
                <h3>{name}</h3>
                <p>{studio}</p>
              </footer>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
