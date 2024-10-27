import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem
} from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import NextLink from 'next/link'
import Image from 'next/image'

import NavbarLinks from './nav-bar-links'

import { siteConfig } from '@/config/site'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon
} from '@/components/icons'

export const Navbar = () => {
  return (
    <NextUINavbar
      shouldHideOnScroll
      classNames={{
        wrapper: 'px-0'
      }}
      maxWidth='lg'
      position='sticky'
    >
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarBrand as='li' className='max-w-fit gap-3'>
          <NextLink className='flex items-center justify-start gap-1' href='/'>
            <Image
              alt='logo'
              height={64}
              src='/images/logo/logo4.png'
              width={64}
            />
            <p className='font-bold text-inherit'>Javad Esmati</p>
          </NextLink>
        </NavbarBrand>
        <ul className='ml-2 hidden justify-start gap-4 lg:flex'>
          {siteConfig.navItems.map(item => (
            <NavbarItem key={item.href}>
              <NavbarLinks href={item.href} label={item.label} />
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className='hidden basis-1/5 sm:flex sm:basis-full'
        justify='end'
      >
        <NavbarItem className='hidden gap-2 sm:flex'>
          <Link isExternal aria-label='Twitter' href={siteConfig.links.twitter}>
            <TwitterIcon className='text-default-500' />
          </Link>
          <Link isExternal aria-label='Discord' href={siteConfig.links.discord}>
            <DiscordIcon className='text-default-500' />
          </Link>
          <Link isExternal aria-label='Github' href={siteConfig.links.github}>
            <GithubIcon className='text-default-500' />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className='hidden md:flex'>
          <Button
            isExternal
            as={Link}
            className='bg-default-100 text-sm font-normal text-default-600'
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className='text-danger' />}
            variant='flat'
          >
            Hire Me
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className='basis-1 pl-4 sm:hidden' justify='end'>
        <Link isExternal aria-label='Github' href={siteConfig.links.github}>
          <GithubIcon className='text-default-500' />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className='mx-4 mt-2 flex flex-col gap-2'>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={
                  index === 2
                    ? 'text-primary'
                    : index === siteConfig.navMenuItems.length - 1
                      ? 'text-danger'
                      : 'foreground'
                }
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  )
}
