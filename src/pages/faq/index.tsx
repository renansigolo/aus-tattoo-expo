import Container from "@/components/wordpress/container"
import { classNames } from "@/lib/utils/cn"
import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

const faqs = [
  {
    question: "Will these events go ahead in 2022?",
    answer:
      "As the Covid crisis continues to alter the landscape of public events, there are many elements of uncertainty in terms of guaranteeing when large gatherings can resume without any risks of cancellation or postponement. We are continuing to work closely with advice and updates from federal state governments and public health advice, as such our position is to receive and relay information as soon as it is available. At this point in time, the proposed dates for the 2022 event calendar remain subject to change.",
  },
  {
    question: "Will I get a refund for my Booth(s)?",
    answer:
      "Credit will be held for any 2022 Events. If these dates are not suitable then you can request for your credit to be carried over until 2023 on a case-by-case basis.",
  },
  {
    question: "Will I get a refund for my Ticket(s)?",
    answer:
      "Tickets are non-refundable, however, all tickets pre-purchased for our rescheduled events are valid for the rescheduled dates. In scenarios resulting in the ticket holder(s) being unable to attend the rescheduled dates, refunds may be offered on a case by case basis.",
  },
  {
    question:
      "If I have paid a deposit or made additional payments towards my booth(s) is there a risk of my payment(s) being lost?",
    answer:
      "No. Our commitment to meet and exceed our contracted obligations with all booth purchasers will continue to be fulfilled. All booth payments will be honored for the rescheduled dates or can be honored as a booth credit that can be redeemed on any of our future events. In the instance that the booth booker or company is unwilling to attend the rescheduled dates or to accept a booth credit, the booth in question will be re-released as available floor space to recoup the moneys owed for a refund. Once the floorspace has been on-sold, a responsible refund will be offered to the original purchaser.",
  },
  {
    question:
      "If I can't attend the proposed rescheduled dates as a patron, what are my options?",
    answer:
      "If you as a ticket purchaser or ticket holder are unable to attend the rescheduled dates, your ticket can be transferred to an alternate Australian Exhibition Group event, or can be gifted or donated to friends or family members. In the event of your tickets being transferred to another attendee, the details of the attendee's ticket will be updated by our staff to ensure a smooth check-in process.",
  },
  {
    question:
      "If I feel unsafe attending a public event due to the pandemic, what are my options?",
    answer:
      "Our staff, exhibitors and patron's health and safety remains our number one priority. If you feel unsafe attending a public gathering in the current climate, we respect your decision and will not force anyone to attend. In the event that you are unable to attend, your ticket can be gifted or given to friends or family members. In the event of your tickets being transferred to another attendee, the details of the attendee's ticket will be updated by our staff to ensure a smooth check-in process.",
  },
]

export default function FAQ() {
  return (
    <section className="bg-zinc-900 pb-12">
      <h1 className="py-6 text-center text-3xl font-bold tracking-tight text-white sm:text-3xl">
        FAQ
      </h1>

      <Container>
        <div className="rounded-sm bg-gray-50">
          <div className="mx-auto max-w-7xl py-12 px-6 sm:py-16 lg:px-8">
            <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
              <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Frequently asked questions
              </h2>
              <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                {faqs.map((faq) => (
                  <Disclosure as="div" key={faq.question} className="pt-6">
                    {({ open }) => (
                      <>
                        <dt className="text-lg">
                          <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                            <span className="font-medium text-gray-900">
                              {faq.question}
                            </span>
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
                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                          <p className="text-base text-gray-500">
                            {faq.answer}
                          </p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
