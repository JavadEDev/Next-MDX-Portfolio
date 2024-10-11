import path from 'path'
import fs from 'fs'

import matter from 'gray-matter'

const rootDirectory = path.join(process.cwd(), 'content', 'projects')

export type Project = {
  metadata: ProjectMetadata
  content: string
}

export type ProjectMetadata = {
  title?: string
  summary?: string
  image?: string
  author?: string
  publishedAt?: string
  slug: string
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
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

export const getAllProjectMeta = async (limit?: number) => {
  const files = fs.readdirSync(rootDirectory)
  let projects = []

  for (const file of files) {
    const project = await getProjectBySlug(file)

    if (project) {
      projects.push(project.metadata)
    }
  }

  projects.sort((a, b) => {
    const dateA = new Date(a.publishedAt || '').getTime()
    const dateB = new Date(b.publishedAt || '').getTime()

    return dateB - dateA
  })

  if (limit) {
    return projects.slice(0, limit)
  }

  return projects
}

export async function getProjects(limit?: number): Promise<ProjectMetadata[]> {
  const files = fs.readdirSync(rootDirectory)

  const projects = files
    .map(file => getProjectMetadata(file))
    .sort((a, b) => {
      if (new Date(a.publishedAt ?? '') < new Date(b.publishedAt ?? '')) {
        return 1
      } else {
        return -1
      }
    })

  if (limit) {
    return projects.slice(0, limit)
  }

  return projects
}

export function getProjectMetadata(filepath: string): ProjectMetadata {
  const slug = filepath.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, filepath)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
  const { data } = matter(fileContent)

  return { ...data, slug }
}
