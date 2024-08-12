export function Button({text, action}:{text: string, action?: () => void}){
  return (
    <button className='text-white p-4 rounded-large bg-black font-bold py-3'>{text}</button>
  )
}