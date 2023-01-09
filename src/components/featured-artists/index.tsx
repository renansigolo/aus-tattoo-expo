import style from "./featured-artists.module.scss"

type FeaturedArtist = {
  name: string
  studio: string
  imageUrl: string
}

const featuredArtists: FeaturedArtist[] = [
  {
    name: "Eric Gordon",
    studio: "The Black Mark",
    imageUrl: "https://placeholder.pics/svg/1024",
  },
  {
    name: "Carly Kawaii",
    studio: "Justat tattoo supplies",
    imageUrl: "https://placeholder.pics/svg/1024",
  },
  {
    name: "Matt Curzon",
    studio: "Empire",
    imageUrl: "https://placeholder.pics/svg/1024",
  },
  {
    name: "Lindsay Walton",
    studio: "Front-end Developer",
    imageUrl: "https://placeholder.pics/svg/1024",
  },
  {
    name: "Lindsay Walton 2",
    studio: "Front-end Developer",
    imageUrl: "https://placeholder.pics/svg/1024",
  },
  {
    name: "Lindsay Walton 3",
    studio: "Front-end Developer",
    imageUrl: "https://placeholder.pics/svg/1024",
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
