import { NavigationFooterItem } from '@/ui/navigationFooterItem'

const NavFooterItems: [] = [
  {
    icon: '',
    title: 'Discovery Hub',
    link: '/discovery-hub',
  },
  {
    icon: '',
    title: 'Account settings',
    link: '/account-settings',
  },
  {
    icon: '',
    title: 'Help',
    link: '/contact',
  }
]

export const NavigationFooter = () => {
  return (
    <div className='flex flex-col gap-1'>
      {NavFooterItems.map((item, index) => (
        <NavigationFooterItem key={index} {...item} />
      ))}
    </div>
  )
}