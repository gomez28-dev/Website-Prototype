export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'Who We Are', href: '/about#who-we-are' },
      { label: 'Our Story', href: '/about#our-story' },
      { label: 'Mission & Vision', href: '/about#mission-vision' },
      { label: 'Why Partner With Us', href: '/about#why-partner' },
    ],
  },
  { label: 'Products', href: '/products' },
  { label: 'Events', href: '/news' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
];
