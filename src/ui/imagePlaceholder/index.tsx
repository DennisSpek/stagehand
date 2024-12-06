export const ImageContainer = ({ children, type = 'square' }: {children?: React.ReactNode, type?: string}) => {

  if( type === 'square') {
    return (
      <div className='w-8 h-8 bg-gray rounded-sm relative'>
        {children}
      </div>
    )
  }

  if( type === 'circle') {
    return (
      <div className='w-8 h-8 bg-halfWhite rounded-full relative'>
        {children}
      </div>
    )
  }
}