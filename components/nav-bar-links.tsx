'use client'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import Link from 'next/link'
import { link as linkStyles } from '@nextui-org/theme'

const NavbarLinks = ({ href, label }: { href: string; label: string }) => {
  const currentPath = usePathname()
  const isActive = (path: string) => currentPath === path

  return (
    <Link
      className={clsx(
        linkStyles({ color: 'foreground', underline: 'active' }),
        isActive(href) && 'text-blue-500'
      )}
      color='foreground'
      href={href}
    >
      {label}
      <span
        className={clsx(
          'absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 transform bg-blue-500 transition-transform duration-300 ease-in-out',
          isActive(href) && 'scale-x-100'
        )}
      />
    </Link>
  )
}

export default NavbarLinks
