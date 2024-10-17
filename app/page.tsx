import Intro from '@/components/intro'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'
import NewsletterForm from '@/components/newsletter-form'

export default function Home() {
  return (
    <section className='py-2'>
      <div className='container max-w-5xl'>
        <Intro />
        <RecentPosts />
        <RecentProjects />
        <NewsletterForm />
      </div>
    </section>
  )
}
