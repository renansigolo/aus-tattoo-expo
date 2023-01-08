import Container from '@/components/wordpress/container'
import style from './book.module.scss'

const highlights = [
  { title: 'X+', description: 'Events' },
  { title: 'X+', description: 'Tattoo Artists' },
  { title: 'X+', description: 'Visitors' },
  { title: 'X+', description: 'Exhibitors' },
]

const steps = [
  {
    title: 'Step 1',
    description: 'Select a city',
    imgUrl: '/images/steps/icon-aus.svg',
  },
  {
    title: 'Step 2',
    description: 'Choose a booth size',
    imgUrl: '/images/steps/icon-tape.svg',
  },
  {
    title: 'Step 3',
    description: 'Customise',
    imgUrl: '/images/steps/icon-brush.svg',
  },
  {
    title: 'Step 4',
    description: 'Sign',
    imgUrl: '/images/steps/icon-sign.svg',
  },
  {
    title: 'Step 5',
    description: 'Payment',
    imgUrl: '/images/steps/icon-card.svg',
  },
  {
    title: 'Step 6',
    description: 'Info Pack',
    imgUrl: '/images/steps/icon-info.svg',
  },
]

const cities = [
  {
    title: 'Sydney',
    date: 'April 1-3',
    venue: 'ICC',
  },
  {
    title: 'Brisbane',
    date: 'July 15-17',
    venue: 'BCEC',
  },
  {
    title: 'Perth',
    date: 'Sept 9-11',
    venue: 'PCEC',
  },
  {
    title: 'Melbourne',
    date: 'Dec 2-4',
    venue: 'MCEC',
  },
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

export default function Book() {
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
          <div className="grid min-h-[30vh] place-content-center text-white">
            <h2>SECTION 2 CONTENT</h2>
          </div>
        </section>

        <section id="section-3" className={style.sectionSpacing}>
          <Heading title="Step 3" description="Customise Your Booth" />
          <div className="grid min-h-[30vh] place-content-center text-white">
            <h2>SECTION 3 CONTENT</h2>
          </div>
        </section>
      </Container>

      <section className={`${style.sectionSpacing} max-w-full bg-black`}>
        <Container>
          <Heading title="Step 4" description="Sign" />
          <div className="grid min-h-[30vh] place-content-center text-white">
            <h2>SECTION 4 CONTENT</h2>
          </div>
        </Container>
      </section>

      <section className={style.sectionSpacing}>
        <Container>
          <Heading title="Step 5" description="Payment" />
          <div className="grid min-h-[30vh] place-content-center text-white">
            <h2>SECTION 5 CONTENT</h2>
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
    </div>
  )
}
