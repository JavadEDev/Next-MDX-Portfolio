import Link from 'next/link'
import Image from 'next/image'

import { formatDate } from '@/lib/utils'
import { ProjectMetadata } from '@/lib/projects'

export default function Projects({
  projects
}: {
  projects: ProjectMetadata[]
}) {
  return (
    <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
      {projects.map(project => (
        <li
          key={project.slug}
          className='group relative overflow-hidden rounded-lg'
        >
          <Link href={`/projects/${project.slug}`}>
            {project.image && (
              <div className='h-72 w-full overflow-hidden sm:h-60'>
                <Image
                  fill
                  alt={project.title || ''}
                  className='object-cover object-center transition duration-300 group-hover:scale-110'
                  src={project.image}
                />
              </div>
            )}

            <div className='absolute inset-1 rounded-md bg-white bg-opacity-70 opacity-0 transition duration-300 group-hover:opacity-100' />
            <div className='absolute inset-0 flex translate-y-full flex-col justify-end p-6 text-black transition duration-300 group-hover:translate-y-0'>
              <h2 className='mb-2 text-xl font-semibold'>{project.title}</h2>
              <p className='mb-1 text-sm'>{project.summary}</p>
              <p className='text-xs font-light'>
                {formatDate(project.publishedAt ?? '')}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
