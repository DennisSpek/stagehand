import clsx from 'clsx'

export const VerticalSeperator = ({ className }: {className: string}) => {
  return (
    <div className={clsx(`h-full bg-gray w-[1px]`, className)}>

    </div>
  )
}