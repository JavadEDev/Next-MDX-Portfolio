import { Link } from '@nextui-org/link'
import { Divider } from '@nextui-org/divider'

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Divider className='mx-auto my-12 max-w-5xl overflow-hidden bg-zinc-200 px-6' />
      <footer>
        <Link
          isExternal
          className='flex items-center gap-1 text-current'
          href='https://nextui-docs-v2.vercel.app?utm_source=next-app-template'
          title='nextui.org homepage'
        >
          <span className='text-default-600'>Powered by</span>
          <p className='text-primary'>NextUI</p>
        </Link>
      </footer>
    </div>
  )
}

export default Footer
