export const BlackRoundedButton = ({children, disabled = false} : {children: React.ReactNode, disabled?: boolean}) => {
  return (
    <button disabled={disabled} className='rounded-normal border border-black p-2 font-bold w-full' type='submit'>
      {children}
    </button>
  )
}