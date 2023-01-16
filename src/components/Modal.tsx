import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { default as Image } from "next/image"
import { Fragment } from "react"

type ModalProps = {
  sourceUrl: string
  open?: boolean
  setOpen?: any
}
export default function Modal({
  sourceUrl,
  open = false,
  setOpen,
}: ModalProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        {/* Background Transparency */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="mx-auto flex min-h-full max-w-2xl items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative min-h-[80vh] min-w-full transform overflow-hidden rounded-lg p-4 shadow-xl transition-all">
                <div className="absolute top-0 right-0 z-10 sm:block">
                  <button
                    type="button"
                    className="text-gray-800 opacity-0 hover:text-gray-500 focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <Image
                  fill
                  src={sourceUrl}
                  alt="Image"
                  className="object-contain"
                  // width={Number(image.mediaDetails?.width)}
                  // height={Number(image.mediaDetails?.height)}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
