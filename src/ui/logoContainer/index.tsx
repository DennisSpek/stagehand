import Link from 'next/link'
import clsx from 'clsx';

export const LogoContainer = ({className}: {className: string}) => {
  return (
    <Link href="/">
      <h1 className={clsx(className, 'font-bold')}>Stagehand</h1>
    </Link>
  )
}