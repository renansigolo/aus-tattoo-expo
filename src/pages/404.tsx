import Link from "next/link"

export default function Custom404() {
  return (
    <>
      <div className="flex h-[62vh] min-h-full flex-col bg-zinc-900 pt-16 pb-12">
        <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8">
          <div className="py-16">
            <div className="text-center">
              <p className="text-base font-semibold text-primary-600">404</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl">
                Page not found.
              </h1>
              <p className="mt-2 text-base text-gray-300">
                Sorry, we could not find the page you are looking for.
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="text-base font-medium text-primary-600 hover:text-primary-500"
                >
                  Go back home
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
