import CheckoutForm from "@/components/checkout-form"
import Hero from "@/components/hero/hero"
import Container from "@/components/wordpress/container"
import Footer from "@/layouts/footer"
import { getPageContent, PageContent } from "@/lib/api"
import { getStripe } from "@/lib/utils/stripe"
import { Elements } from "@stripe/react-stripe-js"
import { StripeElementsOptions } from "@stripe/stripe-js"
import { GetStaticProps } from "next"
import Image from "next/image"
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

type Product = {
  id: string
  name: string
  price: number
  default_price: string
  description: string
  images: string[]
}
const products: Product[] = [
  {
    id: "prod_N8Qb5yLbfeqEfo",
    name: "Single Booth",
    price: 1300,
    default_price: "prod_N8Qb5yLbfeqEfo",
    description: "2.5m x 2.0m",
    images: ["https://placeholder.pics/svg/300x500"],
  },
  {
    id: "prod_N8RHtaizh0Mv1V",
    name: "Double Booth",
    price: 2500,
    default_price: "price_1MOAPEKRqEIk54YDba6Kwzfv",
    description: "4.5m x 2.0m",
    images: ["https://placeholder.pics/svg/300x500"],
  },
  {
    id: "prod_N8RIctnTNKm3e5",
    name: "Triple Booth",
    price: 3600,
    default_price: "price_1MOAPdKRqEIk54YDpLwSoZoD",
    description: "6.5m x 2.0m",
    images: ["https://placeholder.pics/svg/300x500"],
  },
  {
    id: "prod_N8RI9OojluRfp9",
    name: "Quad. Booth",
    price: 4600,
    description: "8.5m x 2.0m",
    default_price: "price_1MOAQ9KRqEIk54YDzuPfOUvR",
    images: ["https://placeholder.pics/svg/300x500"],
  },
  {
    id: "prod_N8RKaoDUqLGKDB",
    name: "5 or more artist booth",
    price: 1100,
    description: "0.5m + 2.0m PER ARTISTS",
    default_price: "price_1MOARQKRqEIk54YDq1JBX67e",
    images: ["https://placeholder.pics/svg/300x500"],
  },
]

const stripePromise = getStripe()

type BookProps = {
  pageContent: PageContent
}
export default function Book({ pageContent }: BookProps) {
  const [clientSecret, setClientSecret] = useState("")
  const [item, setItem] = useState<Product>()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ id: item?.id || "prod_N8Qb5yLbfeqEfo" }],
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [item])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: "stripe" },
  }

  const addToCart = (product: Product) => setItem(product)

  return (
    <div className={style.book}>
      <section className="grid h-9 place-content-center bg-red-300">
        <h2>NAVBAR</h2>
      </section>

      <Hero
        sourceUrl={pageContent.featuredImage.sourceUrl}
        altText={pageContent.featuredImage.sourceUrl}
      />

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
              {products.map((product, index) => (
                <div
                  key={product.name}
                  className={`hover:cursor-pointer hover:drop-shadow-lg ${
                    product.id === item?.id
                      ? "border-4 border-primary-600"
                      : "border-transparent"
                  }`}
                  onClick={() => addToCart(product)}
                >
                  <div className="bg-primary p-6 hover:bg-primary-100">
                    <h2 className="text-lg font-medium uppercase leading-6">
                      {product.name}
                    </h2>
                    <p className="mt-4 text-sm">{product.description}</p>
                    <p className="mt-8">
                      <span className="text-4xl font-bold tracking-tight">
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
                    <img src={product.images[0]} alt={product.name} />
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
          <div className={style.stripe}>
            {clientSecret && (
              <Elements
                options={options}
                stripe={stripePromise}
                key={clientSecret}
              >
                <CheckoutForm />
              </Elements>
            )}
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

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const pageContent = await getPageContent("book")

  return {
    props: { pageContent },
    revalidate: 10,
  }
}
