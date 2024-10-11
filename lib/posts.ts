import path from 'path'
import fs from 'fs'

import matter from 'gray-matter'

const rootDirectory = path.join(process.cwd(), 'content', 'posts')

export type Post = {
  metadata: PostMetadata
  content: string
}

export type PostMetadata = {
  title?: string
  summary?: string
  image?: string
  author?: string
  publishedAt?: string
  slug: string
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const realSlug = slug.replace(/\.mdx$/, '')
    const filePath = path.join(rootDirectory, `${realSlug}.mdx`)

    const fileContents = fs.readFileSync(filePath, 'utf-8')

    const { data, content } = matter(fileContents)

    return { metadata: { ...data, slug: realSlug }, content }
  } catch (error) {
    return null
  }
}

export const getAllPostMeta = async (limit?: number) => {
  const files = fs.readdirSync(rootDirectory)
  let posts = []

  for (const file of files) {
    const post = await getPostBySlug(file)

    if (post) {
      posts.push(post.metadata)
    }
  }

  posts.sort((a, b) => {
    const dateA = new Date(a.publishedAt || '').getTime()
    const dateB = new Date(b.publishedAt || '').getTime()

    return dateB - dateA
  })

  if (limit) {
    return posts.slice(0, limit)
  }

  return posts
}

export async function getPosts(limit?: number): Promise<PostMetadata[]> {
  const files = fs.readdirSync(rootDirectory)

  const posts = files
    .map(file => getPostMetadata(file))
    .sort((a, b) => {
      if (new Date(a.publishedAt ?? '') < new Date(b.publishedAt ?? '')) {
        return 1
      } else {
        return -1
      }
    })

  if (limit) {
    return posts.slice(0, limit)
  }

  return posts
}

export function getPostMetadata(filepath: string): PostMetadata {
  const slug = filepath.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, filepath)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
  const { data } = matter(fileContent)

  return { ...data, slug }
}
