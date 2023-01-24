import { SocialMediaIcons } from "@/components/SocialMediaIcons"
import { GetLayout } from "@/interfaces/get-layout"
import { classNames } from "@/lib/utils/cn"
import { Popover, Transition } from "@headlessui/react"
import {
  Bars3Icon,
  ChevronDownIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import { Fragment } from "react"

type NavbarProps = {
  siteIdentity: GetLayout["acfOptionsGeneral"]["general"]["siteIdentity"]
  generalSettings: GetLayout["generalSettings"]
  menuItems: GetLayout["menuItems"]
}
export function Navbar({
  siteIdentity,
  menuItems,
  generalSettings,
}: NavbarProps) {
  return (
    <Popover className="relative">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex min-w-full items-center justify-between py-6 lg:justify-start">
          {/* Desktop Logo */}
          <Link href="/" className="mr-6">
            <span className="sr-only">{generalSettings.title}</span>
            <Image
              className="h-8 w-auto sm:h-10"
              src={siteIdentity.logo.sourceUrl}
              alt={siteIdentity.logo.altText || "Brand Logo"}
              width={32}
              height={32}
            />
          </Link>

          {/* Navigation Items */}
          <Popover.Group as="nav" className="hidden space-x-4 lg:flex">
            {menuItems.edges.map(({ node }) =>
              node.childItems && node.childItems?.edges.length > 0 ? (
                <div key={node.id}>
                  <Popover className="relative">
                    {({ open, close }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? "text-gray-100" : "text-gray-200",
                            "group inline-flex items-center rounded-md text-base font-medium hover:text-gray-400 focus:outline-none"
                          )}
                        >
                          <span>{node.label}</span>
                          <ChevronDownIcon
                            className={classNames(
                              open ? "text-gray-100" : "text-gray-200",
                              "ml-1 h-4 w-4 group-hover:text-gray-400"
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-2 ring-gray-500 ring-opacity-40">
                              <div className="relative grid gap-6 bg-black px-5 py-6 sm:gap-8 sm:p-8">
                                {node.childItems?.edges.map(({ node }) => (
                                  <Link
                                    key={node.label}
                                    href={node.path || "#"}
                                    className="-m-3 flex items-start rounded-lg p-3 hover:bg-primary-900 hover:bg-opacity-30 hover:ring-1 hover:ring-primary hover:ring-opacity-40"
                                    target={(node.target ||= "_self")}
                                    onClick={() => close()}
                                  >
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-100">
                                        {node.label}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
              ) : (
                <Link
                  key={node.label}
                  href={node.path || "#"}
                  className="text-base font-medium text-gray-200 hover:text-gray-400"
                  target={(node.target ||= "_self")}
                >
                  {node.label}
                </Link>
              )
            )}
          </Popover.Group>

          {/* Navbar END:  Social Icons and Cta Button */}
          <div className="hidden items-center justify-end text-gray-50 lg:flex lg:w-0 lg:flex-1">
            <SocialMediaIcons
              instagramUrl={siteIdentity.instagramUrl}
              facebookUrl={siteIdentity.facebookUrl}
              twitterUrl={siteIdentity.twitterUrl}
            />
            {siteIdentity.ticketsUrl && (
              <Link
                href={siteIdentity.ticketsUrl}
                className="ml-4 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700"
                target={"_blank"}
              >
                Buy Tickets
              </Link>
            )}
            <Link
              href="/shop/booths"
              className="text-white hover:text-primary-500"
            >
              <ShoppingCartIcon className="ml-2 h-7 w-7 " />
            </Link>
          </div>

          {/* Toggle Menu Button */}
          <div className="-my-2 -mr-2 lg:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-50 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-50">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition lg:hidden"
        >
          {({ close }) => (
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Image
                      className="h-8 w-auto"
                      src={siteIdentity.logo.sourceUrl}
                      alt={siteIdentity.logo.altText || "Brand Logo"}
                      width={32}
                      height={32}
                    />
                  </div>
                  {/* Close Mobile Menu Icon */}
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {menuItems.edges.map(({ node }, index) => (
                      <Link
                        key={index}
                        href={node.path || "#"}
                        className="-m-3 flex flex-col rounded-md p-3 hover:bg-gray-50"
                        target={(node.target ||= "_self")}
                        onClick={() => close()}
                      >
                        <p className="ml-3 text-base font-medium text-gray-900">
                          {node.label}
                        </p>
                        {node.childItems?.edges.map(({ node }) => (
                          <Link
                            key={node.label}
                            href={node.path || "#"}
                            target={(node.target ||= "_self")}
                          >
                            <p className="my-4 ml-6 text-base text-gray-500">
                              {node.label}
                            </p>
                          </Link>
                        ))}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5">
                <div>
                  {siteIdentity.ticketsUrl && (
                    <Link
                      href={siteIdentity.ticketsUrl}
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700"
                      target={"_blank"}
                    >
                      Buy Tickets
                    </Link>
                  )}

                  <p className="mt-6 text-center text-base font-medium">
                    <Link
                      href="/shop/booths"
                      className="text-primary-600 hover:text-primary-500"
                      onClick={() => close()}
                    >
                      Book a Booth
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
