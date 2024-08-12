import Link from 'next/link';

interface NavigationFooterItemProps {
  icon: React.ReactNode;
  title: string;
  link: string;
}

export const NavigationFooterItem = ({icon, title, link}: NavigationFooterItemProps) => {
  return (
    <Link href={link}>
      <div className='rounded-sm py-3 px-3.5 h-12 flex items-center gap-3 hover:bg-lightGray transition-colors duration-200'>
        {icon}
        <span className='font-normal text-gray'>{title}</span>
      </div>
    </Link>
  )
}