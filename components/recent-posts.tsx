import { Link } from '@nextui-org/link'

import Posts from './posts'

import { getAllPostMeta } from '@/lib/posts'

export default async function RecentPosts() {
  const posts = await getAllPostMeta(4)

  return (
    <section className='pb-12 pt-12'>
      <div>
        <h2 className='title mb-4'>Recent Posts</h2>
        <Posts posts={posts} />
        <Link
          className='mt-8 inline-flex items-center gap-2'
          href='/posts'
          size='md'
          underline='hover'
        >
          <span>All Posts</span>
        </Link>
      </div>
    </section>
  )
}
