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
      label: 'Profile',
      href: '/profile'
    },
    {
      label: 'Dashboard',
      href: '/dashboard'
    },
    {
      label: 'Projects',
      href: '/projects'
    },
    {
      label: 'Team',
      href: '/team'
    },
    {
      label: 'Calendar',
      href: '/calendar'
    },
    {
      label: 'Settings',
      href: '/settings'
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback'
    },
    {
      label: 'Logout',
      href: '/logout'
    }
  ],
  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev'
  }
}
