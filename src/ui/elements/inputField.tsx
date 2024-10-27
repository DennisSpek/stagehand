export const InputField = (props: any) => {
  return (
    <input {...props} className='w-full max-w-[280px] py-2 px-4 bg-lightGray border border-darkGray rounded-sm outline-none shadow-none p-0 placeholder:text-black'></input>
  )
}

export const LongInputField = (props: any) => {
  return (
    <input {...props} className='w-full max-w-[400px] py-2 px-4 bg-white border border-lightGray text-black rounded-sm outline-none shadow-none p-0 placeholder:text-darkGray'></input>
  )
}
