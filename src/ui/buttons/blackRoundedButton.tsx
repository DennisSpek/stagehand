export const BlackRoundedButton = ({children, disabled} : {children: React.ReactDOM, disabled: boolean}) => {
  return (
    <button disabled={disabled} className='rounded-normal border border-black p-2 font-bold w-full' type='submit'>
      {children}
    </button>
  )
}