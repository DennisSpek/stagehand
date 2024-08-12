import clsx from 'clsx'

export const ElementContainer = ({ children, className }: { children: React.ReactNode, className: string }) => {
  return(
    <div className={clsx('bg-white rounded-normal border border-vividBlue', className)}>
      {children}
    </div>
  )
}