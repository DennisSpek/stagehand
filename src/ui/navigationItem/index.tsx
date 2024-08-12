import Link from 'next/link';

interface NavigationItemProps {
  icon: React.ReactNode;
  title: string;
  link: string;
}

export const NavigationItem = ({icon, title, link}: NavigationItemProps) => {
  return (
    <Link href={link}>
      <div className='rounded-sm p-4 bg-lighterBlue h-12 flex items-center gap-3 hover:bg-lightBlue transition-colors duration-200'>
        {icon}
        <span className='font-bold'>{title}</span>
      </div>
    </Link>
  )
}