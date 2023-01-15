import Image from "next/image"

export default function Banner() {
  return (
    <section>
      <Image
        src="/images/ate-buy-ticket-banner.jpg"
        width={2360}
        height={270}
        alt="Buy Tickets"
      />
    </section>
  )
}
