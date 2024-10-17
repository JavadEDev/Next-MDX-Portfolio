import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import Image from 'next/image'

import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { getProjectBySlug, getProjects } from '@/lib/projects'

type ProjectProps = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const projects = await getProjects()
  const slugs = projects.map(project => ({ slug: project.slug }))

  return slugs
}

export default async function Project({ params }: ProjectProps) {
  const { slug } = params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return NotFound()
  }
  const { metadata, content } = project
  const { title, image, author, publishedAt } = metadata

  return (
    <section className='pb-24'>
      <div className='container max-w-7xl'>
        <Link
          className='mb-8 inline-flex items-center gap-2 text-sm font-light'
          href='/projects'
        >
          <ArrowLeftIcon className='h-5 w-5' />
          <span>Back to project</span>
        </Link>
        {image && (
          <div className='relative mb-6 h-96 w-full overflow-hidden rounded-lg'>
            <Image
              fill
              alt={title || ''}
              className='object-cover'
              src={image}
            />
          </div>
        )}
        <header>
          <h1 className='title'>{title}</h1>
          <p className='mt-3 text-xs'>
            {author} / {formatDate(publishedAt ?? '')}
          </p>
        </header>
        <main className='prose mt-16 max-w-5xl dark:prose-invert'>
          <MDXContent source={content} />
        </main>
      </div>
    </section>
  )
}
