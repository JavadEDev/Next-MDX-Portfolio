import Projects from '@/components/projects'
import { getAllProjectMeta } from '@/lib/projects'

export default async function ProjectsPage() {
  const projects = await getAllProjectMeta()

  return (
    <section className='pb-24'>
      <div className='container max-w-5xl'>
        <h1 className='title mb-12'> Projects</h1>
        <Projects projects={projects} />
      </div>
    </section>
  )
}
