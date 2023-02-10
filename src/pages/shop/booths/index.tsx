import client from "@/apollo/client"
import { Notification } from "@/components/feedback/Notification"
import { HeroBanner } from "@/components/flexible/HeroBanner"
import { Container } from "@/components/layout/Container"
import { GetBoothsPage, GET_BOOTHS_PAGE } from "@/io/queries/get-booths-page"
import { postRequest } from "@/utils/post-request"
import { getStripe } from "@/utils/stripe"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { MouseEventHandler, useState } from "react"

const highlights = [
  { title: "25+", description: "Events" },
  { title: "400+", description: "Tattoo Artists" },
  { title: "5000+", description: "Visitors" },
  { title: "1200+", description: "Exhibitors" },
]

const steps = [
  {
    title: "Step 1",
    description: "Select a city",
    imgUrl: "/images/steps/icon-aus.svg",
  },
  {
    title: "Step 2",
    description: "Choose a booth size",
    imgUrl: "/images/steps/icon-tape.svg",
  },
  {
    title: "Step 3",
    description: "Customise",
    imgUrl: "/images/steps/icon-brush.svg",
  },
  {
    title: "Step 4",
    description: "Sign",
    imgUrl: "/images/steps/icon-sign.svg",
  },
  {
    title: "Step 5",
    description: "Payment",
    imgUrl: "/images/steps/icon-card.svg",
  },
  {
    title: "Step 6",
    description: "Info Pack",
    imgUrl: "/images/steps/icon-info.svg",
  },
]

type City = {
  title: string
  date: string
  venue: string
}
const cities: City[] = [
  {
    title: "Sydney",
    date: "April 1-3",
    venue: "ICC",
  },
  {
    title: "Brisbane",
    date: "July 15-17",
    venue: "BCEC",
  },
  {
    title: "Perth",
    date: "Sept 9-11",
    venue: "PCEC",
  },
  {
    title: "Melbourne",
    date: "Dec 2-4",
    venue: "MCEC",
  },
]

const prints = [
  "https://placeholder.pics/svg/300x500/DEDEDE/555555/no-print",
  "https://placeholder.pics/svg/300x500/DEDEDE/555555/print-1",
  "https://placeholder.pics/svg/300x500/DEDEDE/555555/print-2",
  "https://placeholder.pics/svg/300x500/DEDEDE/555555/print-3",
  "https://placeholder.pics/svg/300x500/DEDEDE/555555/print-4",
  "https://placeholder.pics/svg/300x500/DEDEDE/555555/print-5",
  "https://placeholder.pics/svg/300x500/DEDEDE/555555/print-6",
  "https://placeholder.pics/svg/300x500/DEDEDE/555555/print-7",
  "https://placeholder.pics/svg/300x500/DEDEDE/555555/print-8",
  "https://placeholder.pics/svg/300x500/DEDEDE/555555/print-9",
  "https://placeholder.pics/svg/300x500/DEDEDE/555555/print-10",
  "https://placeholder.pics/svg/300x500/DEDEDE/555555/print-11",
]

type HeadingProps = {
  title: string
  description: string
}
const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="mb-12 text-center">
      <p className="inline-flex items-center rounded-full bg-primary px-3 py-0.5 font-medium text-white">
        {title}
      </p>
      <h2 className="mt-1 text-3xl font-bold capitalize tracking-tight text-white sm:text-5xl">
        {description}
      </h2>
    </div>
  )
}

type Booth = {
  id: string
  name: string
  price: number
  default_price: string
  description: string
  images: string[]
  quantity: number
}
const booths: Booth[] = [
  {
    id: "prod_N8Qb5yLbfeqEfo",
    name: "Single Booth",
    price: 1300,
    default_price: "prod_N8Qb5yLbfeqEfo",
    description: "2.0m x 2.5m",
    images: ["/images/booths/single-booth.png"],
    quantity: 1,
  },
  {
    id: "prod_N8RHtaizh0Mv1V",
    name: "Double Booth",
    price: 2500,
    default_price: "price_1MOAPEKRqEIk54YDba6Kwzfv",
    description: "2.0m x 4.5m",
    images: ["/images/booths/double-booth.png"],
    quantity: 1,
  },
  {
    id: "prod_N8RIctnTNKm3e5",
    name: "Triple Booth",
    price: 3600,
    default_price: "price_1MOAPdKRqEIk54YDpLwSoZoD",
    description: "2.0m x 6.5m",
    images: ["/images/booths/triple-booth.png"],
    quantity: 1,
  },
  {
    id: "prod_N8RI9OojluRfp9",
    name: "Quad Booth",
    price: 4600,
    description: "2.0m x 8.5m",
    default_price: "price_1MOAQ9KRqEIk54YDzuPfOUvR",
    images: ["/images/booths/quad-booth.png"],
    quantity: 1,
  },
  {
    id: "prod_N8RKaoDUqLGKDB",
    name: "5 or more artist booth",
    price: 1100,
    description: "2.0m + 0.5m PER ARTISTS",
    default_price: "price_1MOARQKRqEIk54YDq1JBX67e",
    images: ["/images/booths/five-booth.png"],
    quantity: 5,
  },
]

type Props = InferGetStaticPropsType<typeof getStaticProps>
export default function Booths({ page }: Props) {
  const [booth, setBooth] = useState<Booth>(booths[0])
  const [selectedCity, setSelectedCity] = useState<City>(cities[0])
  const [selectedPrint, setSelectedPrint] = useState(prints[0])
  const [loading, setLoading] = useState(false)
  const { query } = useRouter()

  const year = new Date().getFullYear()

  const decreaseQuantity: MouseEventHandler<HTMLButtonElement> = () => {
    // Restrict quantity to 5 for 5 or more artist booth
    if (booth.id === "prod_N8RKaoDUqLGKDB" && booth.quantity < 6) return

    setBooth((item) => ({
      ...item,
      quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
    }))
  }

  const increaseQuantity: MouseEventHandler<HTMLButtonElement> = () => {
    setBooth((item) => ({ ...item, quantity: item.quantity + 1 }))
  }

  const checkout = async () => {
    setLoading(true)

    // Create a Checkout Session.
    const response = await postRequest("/api/checkout-session", { item: booth })

    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }

    // Redirect to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message)
    setLoading(false)
  }
  return (
    <div>
      <Container>
        <HeroBanner useDefaultValues={true} />
      </Container>

      <div className="bg-zinc-900">
        <Container>
          {/* Highlights - Section */}
          <section
            id="highlights"
            className="grid grid-cols-2 gap-4 py-10 lg:grid-cols-4"
          >
            {highlights.map(({ title, description }, index) => (
              <div
                key={index}
                className="flex h-36 w-36 flex-col justify-center place-self-center bg-black text-center font-semibold text-white"
              >
                <h2 className="text-4xl">{title}</h2>
                <p className="text-lg">{description}</p>
              </div>
            ))}
          </section>

          {/* CTA Book - Section */}
          <section id="cta-book">
            <div className="mx-auto py-12 px-6 text-center text-white lg:py-16 lg:px-8">
              <div className="mb-8 flex justify-center">
                <div className="inline-flex rounded-md shadow">
                  <Link
                    href="#steps"
                    className="inline-flex items-center justify-center rounded-sm border border-transparent bg-primary-600 px-5 py-3 text-lg font-medium  text-white hover:bg-primary-700 sm:text-2xl"
                  >
                    Book your booth
                  </Link>
                </div>
              </div>
              <h2 className="sm:text-2xl">
                <span className="block">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat, voluptates voluptatem deleniti, non aliquid
                  exercitationem consectetur ea nemo reprehenderit fuga id
                  officia optio, error iusto aspernatur. Iusto voluptatum
                  explicabo ullam.
                </span>
              </h2>
            </div>
          </section>
        </Container>

        {/* Steps - Section */}
        <section id="steps" className="bg-black">
          <Container>
            <div className="grid grid-cols-2 py-12 text-center text-white sm:grid-cols-3 lg:grid-cols-6 lg:py-16">
              {steps.map(({ title, description, imgUrl }) => (
                <div
                  key={title}
                  className="flex max-w-md flex-col items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold uppercase lg:text-xl">
                      {title}
                    </h3>
                    <p className="mb-2">{description}</p>
                  </div>
                  <img
                    src={imgUrl}
                    alt={title}
                    className="w-full max-w-[240px]"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>

        <Container>
          <section id="step-1" className="sectionSpacing">
            <Heading title="Step 1" description="Select city" />
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {cities.map((city) => (
                <div
                  key={city.title}
                  onClick={() => setSelectedCity(city)}
                  className={`flex w-full flex-col place-content-center bg-black p-4 py-8 text-center uppercase text-gray-500 hover:cursor-pointer hover:text-white
                ${city.title === selectedCity.title && "!text-white"}`}
                >
                  <h3 className="mb-2 text-3xl font-semibold">{city.title}</h3>
                  <p className="text-lg">{city.date}</p>
                  <p className="text-lg">
                    {city.venue}, {city.title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="step-2" className="sectionSpacing">
            <Heading title="Step 2" description="Choose a Booth Size" />
            <div className="grid grid-cols-2 gap-2 text-white sm:gap-6 sm:space-y-0 lg:mx-auto xl:mx-0 xl:max-w-none xl:grid-cols-3">
              {booths.map((product, index) => (
                <div
                  key={product.name}
                  className={`flex flex-col justify-between text-center hover:cursor-pointer hover:drop-shadow-lg ${
                    product.id === booth?.id
                      ? "border-2 border-primary-600"
                      : "border-transparent"
                  }`}
                  onClick={() => setBooth(product)}
                >
                  <div className="bg-primary px-2 py-6 hover:bg-primary-700">
                    <h2 className="font-medium uppercase lg:text-xl">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-sm">{product.description}</p>
                    <p className="mt-4">
                      <span className="font-bold tracking-tight lg:text-4xl">
                        ${product.price}
                      </span>{" "}
                      {index > 3 && (
                        <span className="text-base font-medium text-white">
                          PER ARTIST
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex justify-center px-6 pt-6 pb-8">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      width={512}
                      height={512}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="step-3" className="sectionSpacing">
            <Heading title="Step 3" description="Customise Your Booth" />
            <div className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-2">
              <div className="grid place-content-center">
                <img
                  src={selectedPrint}
                  alt="Selected Print"
                  width={300}
                  height={500}
                />
              </div>
              <div className="bg-black p-8 text-white">
                <h3 className="mb-2 text-3xl font-semibold">$ PER</h3>
                <p className="mb-8 text-justify">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Aliquam nostrum ea veniam maxime.
                </p>

                <h4 className="text-justify text-lg font-semibold uppercase">
                  Select Print:
                </h4>
                <div className="mb-2 grid grid-cols-6 gap-1">
                  {prints.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Print ${index + 1}`}
                      width={300}
                      height={500}
                      className={`hover:cursor-pointer hover:ring-2 hover:ring-primary-200 ${
                        selectedPrint === url && "ring-2 ring-primary-200"
                      }`}
                      onClick={() => setSelectedPrint(url)}
                    />
                  ))}
                </div>
                <span className="flex text-left text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lo
                  ipsum dolor sit amet,
                </span>
              </div>
            </div>
          </section>
        </Container>

        <section className="sectionSpacing max-w-full bg-black">
          <Container>
            <Heading title="Step 4" description="Sign" />
            <div className="grid min-h-[50vh] place-content-center text-white">
              <img
                src={"/images/placeholder-docusign.jpg"}
                alt="Docu Sign"
                width={720}
                height={900}
              />
            </div>
          </Container>
        </section>

        <section id="payment" className="sectionSpacing">
          <Container>
            <Heading title="Step 5" description="Payment" />
            {query.status === "cancelled" && (
              <Notification severity="warning" title={"Cancelled by user"} />
            )}
            {query.status === "success" && (
              <Notification
                severity="success"
                title={
                  "Payment Successful. Please check your email for the receipt."
                }
              />
            )}

            <div className="relative mx-auto mt-8 max-w-sm rounded-lg bg-white shadow-xl ring-1 ring-gray-100">
              <div className="px-4 py-3">
                <p className="mb-2 text-center text-sm text-gray-400">
                  {selectedCity.title} {year} - {selectedCity.date}
                </p>
                <div className="mb-2 grid place-content-center">
                  <img
                    src={booth.images[0]}
                    alt={booth.name}
                    width={352}
                    height={352}
                  />
                </div>
                <h5 className="text-xl font-semibold">{booth.name}</h5>
                <p className="text-sm text-gray-400">
                  {
                    selectedPrint.split("/")[
                      selectedPrint.split("/").length - 1
                    ]
                  }
                </p>
                <p className="text-sm text-gray-400">{booth.description}</p>

                <div className="mt-3 flex items-center justify-between">
                  <h6 className="text-3xl font-bold">
                    ${booth.price * booth.quantity}
                  </h6>
                  <div className="flex items-center space-x-3">
                    <button
                      className="decrease__quantity rounded-full p-1 ring-1 ring-gray-200"
                      onClick={decreaseQuantity}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <span className="quantity">{booth.quantity}</span>

                    <button
                      className="increase__quantity rounded-full p-1 ring-1 ring-gray-200"
                      onClick={increaseQuantity}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {loading ? (
                  <button
                    type="button"
                    className="mt-6 w-full rounded-md bg-primary-500 py-2 px-3 text-sm uppercase text-white shadow-lg shadow-primary-200 hover:ring-1 hover:ring-primary-500"
                  >
                    Processing...
                  </button>
                ) : (
                  <button
                    type="button"
                    className="mt-6 w-full rounded-md bg-primary-500 py-2 px-3 text-sm uppercase text-white shadow-lg shadow-primary-200 hover:ring-1 hover:ring-primary-500"
                    onClick={checkout}
                  >
                    Reserve Now
                  </button>
                )}
              </div>
            </div>
          </Container>
        </section>

        <section id="info-pack" className="sectionSpacing">
          <Container>
            <Heading title="Step 6" description="Info Pack" />
            <div className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-2">
              <div className="bg-primary p-6 text-center text-white">
                <h3 className="mb-2 text-2xl font-bold uppercase">
                  Exhibitor Manual
                </h3>
                <h4 className="mb-4 text-xl font-semibold uppercase">
                  Every Exhibitor must read!
                </h4>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase underline"
                >
                  Download
                </Link>
                <p className="mt-6 font-semibold">
                  Find above the 2022 Australian Tattoo Expo Exhibitor Manual.
                  <br />
                  <br />
                  This file contains crucial information regarding your booth,
                  load in and load out and much more. Please read this document,
                  as not doing so may result in you not being able to tattoo at
                  the event!
                </p>
              </div>

              <div className="bg-primary p-6 text-center text-white">
                <h3 className="mb-2 text-2xl font-bold uppercase">
                  Waiver Form Example
                </h3>
                <h4 className="mb-4 text-xl font-semibold uppercase">
                  Preview Only
                </h4>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase underline"
                >
                  Download
                </Link>
                <p className="mt-6 font-semibold">
                  Find above the Australian Tattoo Expo Preview Artist Waiver
                  Form (READ ONLY).
                  <br />
                  <br />
                  This form is provided before the event to allow you to read
                  the document before signing it on check in at the event.
                  Please read through this form and make sure you understand it
                  before signing it in person at the event!
                </p>
              </div>
            </div>

            <div className="text-center text-2xl font-bold text-white lg:text-3xl">
              <h2>All done! We look forward to seeing you soon!</h2>
            </div>
          </Container>
        </section>
      </div>
    </div>
  )
}

export const getStaticProps = (async () => {
  const { data } = await client.query<GetBoothsPage>({
    query: GET_BOOTHS_PAGE,
    variables: {
      id: "/shop/booths",
    },
  })

  return {
    props: { ...data },
    revalidate: 30,
  }
}) satisfies GetStaticProps
