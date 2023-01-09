import Container from "../wordpress/container"
import style from "./sponsors.module.scss"

const sponsors = [
  {
    title: "Sponsor Title 1",
    imageUrl: "https://placeholder.pics/svg/256x256",
  },
  {
    title: "Sponsor Title 2",
    imageUrl: "https://placeholder.pics/svg/256x256",
  },
  {
    title: "Sponsor Title 3",
    imageUrl: "https://placeholder.pics/svg/256x256",
  },
  {
    title: "Sponsor Title 4",
    imageUrl: "https://placeholder.pics/svg/256x256",
  },
  {
    title: "Sponsor Title 5",
    imageUrl: "https://placeholder.pics/svg/256x256",
  },
  {
    title: "Sponsor Title 6",
    imageUrl: "https://placeholder.pics/svg/256x256",
  },
]

export default function Sponsors() {
  return (
    <section className="bg-black pt-6">
      <Container>
        <div className={style.sponsors}>
          {sponsors.map(({ title, imageUrl }) => (
            <img
              key={title}
              src={imageUrl}
              alt={title}
              width={256}
              height={256}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
