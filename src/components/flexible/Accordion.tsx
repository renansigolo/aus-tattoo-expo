import { classNames } from "@/utils/cn"
import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

type AccordionProps = {
  items: [
    {
      title: string
      description: string
    }
  ]
}
export function Accordion({ items }: AccordionProps) {
  if (!items) return null

  return (
    <div className="mx-auto">
      <dl className="space-y-6 divide-y divide-gray-200">
        {items.map((item, index) => (
          <Disclosure as="div" key={index} className="pt-6">
            {({ open }) => (
              <>
                <dt className="text-lg text-white">
                  <Disclosure.Button className="flex w-full items-start justify-between text-left">
                    <span className="font-medium">{item.title}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <ChevronDownIcon
                        className={classNames(
                          open ? "-rotate-180" : "rotate-0",
                          "h-6 w-6 transform"
                        )}
                        aria-hidden="true"
                      />
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="mt-2 sm:pr-12">
                  <div
                    className="prose max-w-none text-base text-gray-400"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </div>
  )
}
