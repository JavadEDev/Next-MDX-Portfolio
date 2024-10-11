import { Link } from '@nextui-org/link'

import Projects from './projects'

import { getProjects } from '@/lib/projects'

export default async function RecentProjects() {
  const projects = await getProjects(4)

  return (
    <section className='pb-12'>
      <div>
        <h2 className='title mb-4'>Recent Projects</h2>
        <Projects projects={projects} />
        <Link
          className='mt-8 inline-flex items-center gap-2'
          href='/projects'
          size='md'
          underline='hover'
        >
          <span>All Projects</span>
        </Link>
      </div>
    </section>
  )
}
