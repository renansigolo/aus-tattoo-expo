// This page requires '@tailwindcss/forms'
import Container from "@/components/Container"

export default function Contact() {
  return (
    <section className="relative bg-zinc-900">
      <h1 className="pt-6 text-center text-3xl font-bold tracking-tight text-white sm:text-3xl">
        Contact
      </h1>

      <Container>
        <div className="py-8 lg:px-8 lg:pb-24">
          <div className="mx-auto max-w-lg rounded-lg lg:py-10">
            <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="full-name" className="sr-only">
                  Full name
                </label>
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  autoComplete="name"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Message"
                  defaultValue={""}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 lg:max-w-xs"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
