import { Dialog } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useState } from "react"

const navigation = [
  {
    label: "Artists",
    url: "/artists",
  },
  {
    label: "Retailers",
    url: "/retailers",
  },
  {
    label: "About",
    url: "/about",
  },
  {
    label: "FAQ",
    url: "/faq",
  },
  {
    label: "Contact",
    url: "/contact",
  },
  {
    label: "Book Booth",
    url: "/book",
  },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-black p-6">
      {/* Desktop Navbar */}
      <nav
        className="flex h-9 items-center justify-between"
        aria-label="Global"
      >
        <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8"
              src="https://placeholder.pics/svg/40x40"
              alt="Brand Logo"
            />
          </Link>
        </div>

        <div className="z-10 hidden text-center align-middle text-white lg:flex lg:min-w-0 lg:justify-center lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.url}
              className="self-center font-semibold text-white hover:cursor-pointer hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
          <Link
            href="https://www.eventbrite.com/cc/aus-tattoo-expo-2023-tour-1538659"
            className="inline-block rounded-sm bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-primary shadow-sm ring-1 ring-primary/10 hover:ring-primary/20"
            target="_blank"
          >
            Buy Tickets
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
          <div className="flex h-9 items-center justify-between">
            <div className="flex">
              <Link
                href="/"
                className="-m-1.5 p-1.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8"
                  src="https://placeholder.pics/svg/40x40"
                  alt="Brand Logo"
                />
              </Link>
            </div>
            <div className="flex">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.label}
                    href={item.url}
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/book"
                  className="-mx-3 block rounded-lg py-6 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book a Booth
                </Link>
                <Link
                  href="https://www.eventbrite.com/cc/aus-tattoo-expo-2023-tour-1538659"
                  className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                  onClick={() => setMobileMenuOpen(false)}
                  target="_blank"
                >
                  Buy Tickets
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}
