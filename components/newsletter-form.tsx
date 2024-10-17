'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { Card, CardBody } from '@nextui-org/card'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { Divider } from '@nextui-org/divider'

import { NewsLetterFormSchema } from '@/lib/schema'
import { subscribe } from '@/lib/action'

type Inputs = z.infer<typeof NewsLetterFormSchema>

export default function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(NewsLetterFormSchema),
    defaultValues: {
      email: ''
    }
  })
  const processForm: SubmitHandler<Inputs> = async data => {
    const result = await subscribe(data)

    if (result?.error) {
      toast.error('An error occurred! Please try again.')

      return
    }
    toast.success('Subscribed successfully!')
    reset()
  }

  return (
    <section>
      <Card className='rounded-xl border-0 bg-gradient-to-br from-blue-900 to-blue-300 dark:border'>
        <CardBody className='flex flex-col gap-8 pt-6 md:flex-row md:justify-around'>
          <div>
            <h2 className='text-2xl font-bold'>Subscribe to my newsletter</h2>
            <p className='text-slate-300'>
              Get updates on my work and projects.
            </p>
          </div>
          <div>
            <Divider className='bg-zinc-300' orientation='vertical' />
          </div>
          <form
            className='flex flex-col gap-3'
            onSubmit={handleSubmit(processForm)}
          >
            <div className='w-full'>
              <Input
                key='primary'
                isRequired
                autoComplete='email'
                className='w-full'
                color='primary'
                id='email'
                placeholder='your@email.com'
                radius='sm'
                type='email'
                variant='faded'
                {...register('email')}
              />

              {errors.email?.message && (
                <p className='ml-1 mt-2 text-sm font-semibold text-rose-500'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className='w-full'>
              <Button
                className='w-full disabled:opacity-50'
                color='primary'
                disabled={isSubmitting}
                size='md'
                type='submit'
                variant='shadow'
              >
                {isSubmitting ? 'Submitting...' : 'Subscribe'}
              </Button>
            </div>
            <div>
              <p className='text-xs'>
                By submitting this form, I agree to the{' '}
                <Link
                  isExternal
                  showAnchorIcon
                  className='font-bold'
                  href='/privacy'
                >
                  Privacy&nbsp;policy.
                </Link>
              </p>
            </div>
          </form>
        </CardBody>
      </Card>
    </section>
  )
}
