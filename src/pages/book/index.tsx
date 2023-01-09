import Container from "@/components/wordpress/container"
import Footer from "@/layouts/footer"
import { postRequest } from "@/lib/postRequest"
import { getStripe } from "@/lib/stripe"

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import style from "./book.module.scss"

const highlights = [
  { title: "X+", description: "Events" },
  { title: "X+", description: "Tattoo Artists" },
  { title: "X+", description: "Visitors" },
  { title: "X+", description: "Exhibitors" },
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

const cities = [
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

const tiers = [
  {
    name: "Single Booth",
    href: "#",
    price: 1300,
    description: "2.5m x 2.0m",
    imgUrl: "https://placeholder.pics/svg/300x500",
  },
  {
    name: "Double Booth",
    href: "#",
    price: 2500,
    description: "4.5m x 2.0m",
    imgUrl: "https://placeholder.pics/svg/300x500",
  },
  {
    name: "Triple Booth",
    href: "#",
    price: 3600,
    description: "6.5m x 2.0m",
    imgUrl: "https://placeholder.pics/svg/300x500",
  },
  {
    name: "Quad. Booth",
    href: "#",
    price: 4600,
    description: "8.5m x 2.0m",
    imgUrl: "https://placeholder.pics/svg/300x500",
  },
  {
    name: "5 or more artist booth",
    href: "#",
    price: 1100,
    description: "0.5m + 2.0m PER ARTISTS",
    imgUrl: "https://placeholder.pics/svg/300x500",
  },
]

const prints = [
  "https://placeholder.pics/svg/300x500",
  "https://placeholder.pics/svg/300x500",
  "https://placeholder.pics/svg/300x500",
  "https://placeholder.pics/svg/300x500",
  "https://placeholder.pics/svg/300x500",
  "https://placeholder.pics/svg/300x500",
  "https://placeholder.pics/svg/300x500",
  "https://placeholder.pics/svg/300x500",
  "https://placeholder.pics/svg/300x500",
  "https://placeholder.pics/svg/300x500",
  "https://placeholder.pics/svg/300x500",
  "https://placeholder.pics/svg/300x500",
]

type HeadingProps = {
  title: string
  description: string
}
const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className={style.heading}>
      <p>{title}</p>
      <h2>{description}</h2>
    </div>
  )
}

const mItem = {
  name: "Nike Airforce 1",
  image:
    "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmlrZSUyMHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  price: 200,
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, quia!",
  quantity: 1,
}

const product = {
  id: "prod_N8Qb5yLbfeqEfo",
  object: "product",
  active: true,
  created: 1673226116,
  default_price: "price_1MO9kOKRqEIk54YDWERzCYxd",
  description: "2.5m x 2.0m",
  images: [
    "https://files.stripe.com/links/MDB8YWNjdF8xRTEzWWhLUnFFSWs1NFlEfGZsX3Rlc3RfeTRjU3dkRUZobDM0NnNiS2NNYWhvbnJI00sfNBkJ5y",
  ],
  livemode: false,
  metadata: {},
  name: "Single Booth",
  package_dimensions: null,
  shippable: null,
  statement_descriptor: null,
  tax_code: null,
  unit_label: null,
  updated: 1673226117,
  url: null,
}

const stripePromise = loadStripe(
  String(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
)

export default function Book() {
  const [item, setItem] = useState(mItem)
  const [loading, setLoading] = useState(false)
  const { query } = useRouter()
  const [clientSecret, setClientSecret] = useState("")

  const checkout = async () => {
    setLoading(true)

    // Create a Checkout Session.
    const response = await postRequest("/api/checkout-session", { item })

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

  // const decreaseQuantity: MouseEventHandler<HTMLButtonElement> = () => {
  //   setItem((item) => ({
  //     ...item,
  //     quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
  //   }))
  // }

  // const increaseQuantity: MouseEventHandler<HTMLButtonElement> = () => {
  //   setItem((item) => ({ ...item, quantity: item.quantity + 1 }))
  // }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.")
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      )
    }
  }, [])

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch('/api/create-payment-intent', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret))
  // }, [])

  const options: StripeElementsOptions = {
    locale: "en-AU",
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  }

  return (
    <div className={style.book}>
      <section className="grid h-9 place-content-center bg-red-300">
        <h2>NAVBAR</h2>
      </section>

      <Container>
        {/* Highlights - Section */}
        <section id="highlights" className={style.highlights}>
          {highlights.map(({ title, description }, index) => (
            <div key={index}>
              <h2 className="text-4xl">{title}</h2>
              <p className="text-lg">{description}</p>
            </div>
          ))}
        </section>

        {/* CTA Book - Section */}
        <section id="cta-book">
          <div className="mx-auto max-w-7xl py-12 px-6 text-center text-white lg:py-16 lg:px-8">
            <div className="mb-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-sm border border-transparent bg-primary-600 px-5 py-3 text-lg font-medium  text-white hover:bg-primary-700 sm:text-2xl"
                >
                  Book your booth
                </a>
              </div>
            </div>
            <h2 className="sm:text-2xl">
              <span className="block">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Placeat, voluptates voluptatem deleniti, non aliquid
                exercitationem consectetur ea nemo reprehenderit fuga id officia
                optio, error iusto aspernatur. Iusto voluptatum explicabo ullam.
              </span>
            </h2>
          </div>
        </section>
      </Container>

      {/* Steps - Section */}
      <section id="steps" className="bg-black">
        <Container>
          <div className={style.steps}>
            {steps.map(({ title, description, imgUrl }) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
                <img src={imgUrl} alt={title} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container>
        <section id="section-1" className={style.sectionSpacing}>
          <Heading title="Step 1" description="Select city" />
          <div className="flex flex-col items-center justify-evenly gap-4 lg:flex-row">
            {cities.map(({ title, date, venue }) => (
              <div
                key={title}
                className="hover: flex w-full cursor-pointer flex-col place-content-center bg-black p-8 uppercase text-gray-500 hover:text-white"
              >
                <h3 className="mb-2 text-3xl font-semibold">{title}</h3>
                <p className="text-lg">{date}</p>
                <p className="text-lg">
                  {venue}, {title}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="section-2" className={style.sectionSpacing}>
          <Heading title="Step 2" description="Choose a Booth Size" />

          <div className="mx-auto max-w-7xl py-24 px-6 text-white lg:px-8">
            <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
              {tiers.map((tier, index) => (
                <div key={tier.name}>
                  <div className="bg-primary p-6">
                    <h2 className="text-lg font-medium uppercase leading-6">
                      {tier.name}
                    </h2>
                    <p className="mt-4 text-sm">{tier.description}</p>
                    <p className="mt-8">
                      <span className="text-4xl font-bold tracking-tight">
                        ${tier.price}
                      </span>{" "}
                      {index > 3 && (
                        <span className="text-base font-medium text-white">
                          PER ARTIST
                        </span>
                      )}
                    </p>
                    <a
                      href={tier.href}
                      className="mt-8 block w-full rounded-sm border py-2 text-center text-base font-semibold text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      Choose {tier.name}
                    </a>
                  </div>

                  <div className="flex justify-center px-6 pt-6 pb-8">
                    <img src={tier.imgUrl} alt={tier.name} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="section-3" className={style.sectionSpacing}>
          <Heading title="Step 3" description="Customise Your Booth" />
          <div className={style.customise}>
            <div className="grid place-content-center">
              <img
                src="https://placeholder.pics/svg/300x500"
                alt="Docu Sign"
                width={300}
                height={500}
              />
            </div>
            <div className="bg-black p-8 text-white">
              <h3 className="mb-8 text-3xl font-semibold">$ PER</h3>
              <p className="mb-8 text-justify">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Aliquam nostrum ea veniam maxime soluta necessitatibus dolorem
                beatae iure optio hic adipisci natus, architecto suscipit.
              </p>

              <h4 className="text-justify text-lg font-semibold uppercase">
                Select Print:
              </h4>
              <div className="mb-2 grid grid-cols-6 gap-1">
                {prints.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt="Docu Sign"
                    width={300}
                    height={500}
                    className=" hover:cursor-pointer hover:ring-2 hover:ring-primary-200"
                  />
                ))}
              </div>
              <span className="flex text-left text-xs">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lo
                ipsum dolor sit amet,
              </span>
              <button className={style.addCart}>Add to cart</button>
              <p className="text-justify text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci corrupti quae, laborum, totam necessitatibus nam ipsam.
              </p>
            </div>
          </div>
        </section>
      </Container>

      <section className={`${style.sectionSpacing} max-w-full bg-black`}>
        <Container>
          <Heading title="Step 4" description="Sign" />
          <div className="grid min-h-[50vh] place-content-center text-white">
            <Image
              src={"/images/placeholder-docusign.jpg"}
              alt="Docu Sign"
              width={720}
              height={900}
            />
          </div>
        </Container>
      </section>

      <section className={style.sectionSpacing}>
        <Container>
          <Heading title="Step 5" description="Payment" />
          {/* {query.status === 'cancelled' && (
            <div className="mx-auto mt-7 flex max-w-sm items-center justify-center space-x-3 rounded-lg bg-red-400 p-3 text-white shadow-lg shadow-green-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Cancelled by user</span>
            </div>
          )}
          {query.status === 'success' && (
            <div className="mx-auto mt-7 flex max-w-sm items-center justify-center space-x-3 rounded-lg bg-green-400 p-3 text-white shadow-lg shadow-green-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Payment Successful. Please check your email for the receipt.
              </span>
            </div>
          )}
          <div className="relative mx-auto mt-8 max-w-sm rounded-lg bg-white shadow-xl ring-1 ring-gray-100">
            <div className="px-4 py-3">
              <div className="flex items-center text-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                <span className="text-sm">Shopping</span>
              </div>

              <h5 className="text-xl font-semibold">{item.name}</h5>
              <p className="text-sm text-gray-400">{item.description}</p>

              <div className="mt-3 flex items-center justify-between">
                <h6 className="text-3xl font-bold">
                  ${item.price * item.quantity}
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

                  <span className="quantity">{item.quantity}</span>

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
                  className="mt-6 w-full rounded-md bg-blue-500 py-2 px-3 text-sm uppercase text-white shadow-lg shadow-blue-200 hover:ring-1 hover:ring-blue-500"
                >
                  Processing...
                </button>
              ) : (
                <button
                  type="button"
                  className="mt-6 w-full rounded-md bg-blue-500 py-2 px-3 text-sm uppercase text-white shadow-lg shadow-blue-200 hover:ring-1 hover:ring-blue-500"
                  onClick={checkout}
                >
                  Checkout
                </button>
              )}
            </div>
          </div> */}

          <div className={style.stripe}>
            {/* {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )} */}
            <form action="/api/checkout-sessions" method="POST">
              <section>
                <button type="submit" role="link">
                  Submit Payment
                </button>
              </section>
            </form>
          </div>
        </Container>
      </section>

      <section className={style.sectionSpacing}>
        <Container>
          <Heading title="Step 6" description="Info Pack" />
          <div className={style.infoPack}>
            <div>
              <h3>Exhibitor Manual</h3>
              <h4>Every Exhibitor must read!</h4>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Download
              </a>
              <p>
                Find above the 2022 Australian Tattoo Expo Exhibitor Manual.
                <br />
                <br />
                This file contains crucial information regarding your booth,
                load in and load out and much more. Please read this document,
                as not doing so may result in you not being able to tattoo at
                the event!
              </p>
            </div>

            <div>
              <h3>Waiver Form Example</h3>
              <h4>Preview Only</h4>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Download
              </a>
              <p>
                Find above the Australian Tattoo Expo Preview Artist Waiver Form
                (READ ONLY).
                <br />
                <br />
                This form is provided before the event to allow you to read the
                document before signing it on check in at the event. Please read
                through this form and make sure you understand it before signing
                it in person at the event!
              </p>
            </div>
          </div>

          <div className="text-3xl font-bold text-white">
            <h2>All done! We look forward to seeing you soon!</h2>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  )
}
