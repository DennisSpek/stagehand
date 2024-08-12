import { NavigationGroup } from '@/ui/navigationGroup';
import  { NavigationFooter } from '@/ui/navigationFooter';

export const SideNavigation = () => {
  return (
    <div className='bg-white rounded-normal p-4 border border-vividBlue h-full display: flex flex-col justify-between'>
      <NavigationGroup/>
      <div>
        <NavigationFooter />
      </div>
    </div>
  )
};