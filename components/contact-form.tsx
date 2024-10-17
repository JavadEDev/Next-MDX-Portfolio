'use client'

import { z } from 'zod'
import { toast } from 'react-toastify'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import Link from 'next/link'

import { ContactFormSchema } from '@/lib/schema'
import { sendEmail } from '@/lib/action'

type Inputs = z.infer<typeof ContactFormSchema>

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })
  const processForm: SubmitHandler<Inputs> = async data => {
    const result = await sendEmail(data)

    if (result?.error) {
      toast.error('An error occurred! Please try again.')

      return
    }
    toast.success('Message sent successfully!')
    reset()
  }

  return (
    <section className='relative isolate'>
      <svg className='aria-hidden:"true" absolute inset-0 -z-10 h-full w-full stroke-zinc-200 opacity-50'>
        <defs>
          <pattern
            height={200}
            id='83fd4e5a-9d52-42fc-97b6-718e5d7ee527'
            patternUnits='userSpaceOnUse'
            width={200}
            x='50%'
            y={-64}
          >
            <path d='M100 200V.5M.5 .5H200' fill='none' />
          </pattern>
        </defs>
        <svg
          className='overflow-visible fill-zinc-50 dark:fill-zinc-900/75'
          x='50%'
          y={-64}
        >
          <path d='M100.5 0h201v201h M699.5 0h201v201h-201Z M499.5 400h201v' />
          strokeWidth={0}
        </svg>
        <rect
          fill='url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)'
          height='100%'
          strokeWidth={0}
          width='100%'
        />
      </svg>
      <div className='relative'>
        <form
          noValidate
          className='mt-16 lg:flex-auto'
          onSubmit={handleSubmit(processForm)}
        >
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {/* Name */}
            <div>
              <Input
                isRequired
                autoComplete='given-name'
                id='name'
                placeholder='Name'
                radius='sm'
                type='text'
                variant='bordered'
                {...register('name')}
              />

              {errors.name?.message && (
                <p className='ml-1 mt-2 text-sm text-rose-400'>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Input
                isRequired
                autoComplete='email'
                id='email'
                placeholder='Email'
                radius='sm'
                type='email'
                variant='bordered'
                {...register('email')}
              />

              {errors.email?.message && (
                <p className='ml-1 mt-2 text-sm text-rose-400'>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className='sm:col-span-2'>
              <Textarea
                isRequired
                minRows={4}
                placeholder='Message'
                radius='sm'
                variant='bordered'
                {...register('message')}
              />

              {errors.message?.message && (
                <p className='ml-1 mt-2 text-sm text-rose-400'>
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>
          <div className='mt-6 flex items-center justify-center'>
            <Button
              className='w-64 disabled:opacity-50'
              color='primary'
              disabled={isSubmitting}
              size='md'
              type='submit'
              variant='shadow'
            >
              {isSubmitting ? 'Submitting...' : 'Contact Us'}
            </Button>
          </div>
          <div>
            <p className='mt-4 text-xs'>
            By submitting this form, I agree to the{' '}
            <Link className='font-bold' href='/privacy'>
              Privacy&nbsp;policy.
            </Link>
          </p>
          </div>
        </form>
      </div>
    </section>
  )
}
