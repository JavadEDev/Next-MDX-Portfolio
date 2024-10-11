import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <section className='pb-12 pt-20'>
      <div className='min-h-full px-4 sm:px-6 sm:py-24 md:grid md:place-items-center'>
        <div className='mx-auto max-w-max'>
          <main className='sm:flex'>
            <p className='text-4xl font-bold tracking-tight text-gray-400'>
              404
            </p>
            <div className='sm:ml-6'>
              <div className='sm:border-l-1 sm:border-gray-200 sm:pl-6'>
                <h1 className='text-3xl font-bold tracking-tight sm:text-5xl'>
                  Page not found
                </h1>
                <p className='mt-1 text-base text-zinc-400'>
                  Please check the URL in the address bar nad try again.
                </p>
              </div>
              <div className='mt-10 flex space-x-3 sm:border-1 sm:border-transparent'>
                <Link
                  className='inline-flex items-center gap-3 text-zinc-400'
                  href='/'
                >
                  <ArrowLeftIcon className='h-5 w-5' />
                  <span>Go back home</span>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}
