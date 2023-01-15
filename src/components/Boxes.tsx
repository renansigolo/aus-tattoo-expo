import BuyTickets from "@/components/BuyTickets"

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
    pageUrl: "/shop/booths",
    imageUrl: "https://placeholder.pics/svg/1240",
  },
]

export default function Boxes() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {boxContent.map(({ title, pageUrl, imageUrl }) => (
          <div
            className="grid w-full  justify-items-center text-center uppercase"
            key={title}
          >
            <button className="absolute inline-grid items-center self-center rounded-sm border border-transparent bg-primary-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              {title}
            </button>
            <img className="object-cover" src={imageUrl} alt={title} />
          </div>
        ))}
      </div>

      <BuyTickets />
    </section>
  )
}
