export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Javad Esmati | Front-end Developer Portfolio',
  description:
    'Experienced Front-end Developer specializing in React, Next.js, and modern web technologies. Crafting responsive, user-friendly websites and applications with a focus on performance and accessibility.',
  navItems: [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Posts',
      href: '/posts'
    },
    {
      label: 'Projects',
      href: '/projects'
    },
    {
      label: 'Contact',
      href: '/contact'
    },
    {
      label: 'About',
      href: '/about'
    }
  ],
  navMenuItems: [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Posts',
      href: '/posts'
    },
    {
      label: 'Projects',
      href: '/projects'
    },
    {
      label: 'Contact',
      href: '/contact'
    },
    {
      label: 'About',
      href: '/about'
    }
  ],
  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: '/contact'
  }
}
