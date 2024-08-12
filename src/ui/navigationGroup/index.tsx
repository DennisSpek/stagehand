import { BiSolidDashboard } from "react-icons/bi";

import { NavigationItem } from '@/ui/navigationItem'

export const NavigationGroup = () => {

  const navItems: [] = [
  {
    icon: <BiSolidDashboard />,
    title: 'Dashboard',
    link: `home`
  },
   {
    icon: <BiSolidDashboard />,
    title: 'Releases',
    link: 'releases'
  },
   {
    icon: <BiSolidDashboard />,
    title: 'Fan insights',
    link: 'fan-insights'
  },
  {
    icon: <BiSolidDashboard />,
    title: 'Products',
    link: 'products'
  }
]

  return (
    <div className='flex flex-col gap-4'>
      {
        navItems.map((item, index) => (
          <NavigationItem key={index} {...item}/>
        ))
      }
    </div>
  )
}