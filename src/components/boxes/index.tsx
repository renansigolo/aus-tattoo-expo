import Container from "@/components/wordpress/container"
import Link from "next/link"
import style from "./boxes.module.scss"

const boxContent = [
  {
    title: "Retailers",
    pageUrl: "/retailers",
    imageUrl: "https://placeholder.pics/svg/1240",
  },
  {
    title: "Entertainment",
    pageUrl: "#",
    imageUrl: "https://placeholder.pics/svg/1240",
  },
  {
    title: "Shop",
    pageUrl: "/book",
    imageUrl: "https://placeholder.pics/svg/1240",
  },
]

export default function Boxes() {
  return (
    <Container>
      <section className={style.section}>
        <div className={style.boxes}>
          {boxContent.map(({ title, pageUrl, imageUrl }) => (
            <div className={style.card} key={title}>
              <button className={style.cardTitle}>{title}</button>
              <img className={style.cardImage} src={imageUrl} alt={title} />
            </div>
          ))}
        </div>
        <div className={style.tickets}>
          <Link
            href="https://www.eventbrite.com/cc/aus-tattoo-expo-2023-tour-1538659"
            target="_blank"
          >
            Buy Tickets
          </Link>
        </div>
      </section>
    </Container>
  )
}
