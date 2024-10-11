import PostsWithSearch from '@/components/posts-with-search'
import { getAllPostMeta } from '@/lib/posts'

export default async function PostsPage() {
  const posts = await getAllPostMeta()

  return (
    <section className='pb-24'>
      <div className='container max-w-5xl'>
        <h1 className='title mb-12'>Posts</h1>
        <PostsWithSearch posts={posts} />
      </div>
    </section>
  )
}
