import clsx from 'clsx'

export const HorizontalSeperator = ({children, className}: {children?: React.ReactNode, className?: string}) => {
  return (
    <div className={clsx('relative justify-center items-center w-full', className)}>
      <div className='h-px bg-lightGray w-full'></div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        {children}
      </div>
    </div>
  )
}