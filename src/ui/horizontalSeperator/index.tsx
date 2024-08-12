import clsx from 'clsx'

export const HorizontalSeperator = ({children, className}: {children: React.ReactNode, className: string}) => {
  return (
    <div className={clsx('relative inline-flex justify-center items-center w-full', className)}>
      <div className='border border-lightGray w-full'></div>
      <div className='absolute'>
        {children}
      </div>
    </div>
  )
}