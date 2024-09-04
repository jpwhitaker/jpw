/* eslint-disable react/no-unescaped-entities */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Modal({ open, setOpen }) {


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-[100] bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-[101] w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center  sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="touch-auto relative transform overflow-hidden rounded-lg bg-gray-700 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-gray-700 text-gray-400 cursor-pointer hover:text-gray-500 focus:outline-none "
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start w-full">

                  <div className="mt-3 text-left sm:ml-4 sm:mt-0 ">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-relaxed leading-6 text-white">
                      About
                    </Dialog.Title>
                    <div className="mt-2 w-full text-sm text-gray-300 divide-gray-500">
                      <p className="font-semibold mb-2">
                        Ke 'Ano o Nā Lā
                        O Ka Mahina,
                        <br />
                        <em>The Days of The Month</em>
                      </p>
                      <p className=''>
                        "There were 360 days in a year. Ka po'e kahiko counted 30 days in each month of the 12 months of the year. There were 17 nights that were counted in groups and 13 counted separately, according to the phase of the moon.
                        There were three phases or ano: the 'growing' (ho'onui, waxing); the 'round' (poepoe, full); and the 'decreasing' (emi, waning)."
                      </p>
                      <p className='text-right'>
                      <em>-Samuel Manaikalani Kamakai, 1870</em>
                      </p>
                      <hr className='my-4' />
                      <p className="">
                        Text from the Bishop Museum.
                      </p>
                      
                      <p className="">
                        Programmed by <a className="underline cursor-pointer" href="mailto:jpw@hawaii.edu">jpw@hawaii.edu</a>, <a className="underline" href="https://github.com/jpwhitaker">https://github.com/jpwhitaker</a>.
                      </p>
                      {/* <p className="pt-2">
                        Growing up in 'Aiea, Hawai'i, I've always been interested in Hawaiian history and culture.  As a software engineer for the past 10-years I've only recently started experimenting in ways to marry the two passions.
                      </p>
                      <p className="pt-2">
                        This experiment started as a Three.js demo, which I ported to React Three Fiber.  I used color map and bump map data from <a className="underline cursor-pointer" href="https://svs.gsfc.nasa.gov/cgi-bin/details.cgi?aid=4720">NASA</a>.
                      </p>
                      
                      <p className="pt-2">
                        I am currently looking for work, I am most interested in making visualizations/interactive experiences for the following fields:
                      </p>
                      <ul className='list-disc pl-6 mt-2'>
                        <li>
                          Stustainability
                        </li>
                        <li>
                          Urban Planning
                        </li>
                        <li>
                          Climate
                        </li>
                        <li>
                          Ocean/Land Preservation
                        </li>
                        <li>
                          History
                        </li>
                        <li>
                          Education
                        </li>
                      </ul> */}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
/* eslint-enable react/no-unescaped-entities */