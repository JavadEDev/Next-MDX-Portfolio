'use client'
import { useState } from 'react'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Cross2Icon } from '@radix-ui/react-icons'

import Posts from './posts'

import { PostMetadata } from '@/lib/posts'

export default function PostsWithSearch({ posts }: { posts: PostMetadata[] }) {
  const [search, setSearch] = useState('')

  const filtered = posts.filter(post =>
    post.title?.toLowerCase().includes(search.toLowerCase())
  )

  const isFiltered = search.length > 0

  function resetFilter() {
    setSearch('')
  }

  return (
    <div>
      <div className='item-center mb-12 flex gap-3'>
        <Input
          isClearable
          className='max-w-xs'
          placeholder='Search posts ...'
          radius='sm'
          size='sm'
          type='text'
          value={search}
          variant='bordered'
          onChange={e => setSearch(e.target.value)}
          onClear={resetFilter}
        />
        {isFiltered && (
          <Button
            className='max-w-xs'
            color='danger'
            size='sm'
            variant='ghost'
            onClick={resetFilter}
          >
            Reset
            <Cross2Icon className='h-4 w-4' />
          </Button>
        )}
      </div>
      <Posts posts={filtered} />
    </div>
  )
}
