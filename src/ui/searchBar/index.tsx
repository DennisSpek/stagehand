import { IoMdSearch } from "react-icons/io";

interface SearchProps {
  callback: (value: string) => void;
  placeholder: string;
  className?: string;
}

export const SearchBar = ({ callback, placeholder, className } : SearchProps) => {
  return (
    <div className={`w-full max-w-[480px] h-12 flex px-4 py-[7px] bg-lightGray gap-2 items-center rounded-2xl ${className}`}>
      <IoMdSearch fill='#727272'/>
      <input className='bg-transparent text-darkGray outline-none w-full' type='text' placeholder={placeholder} onChange={(e) => callback(e.target.value)} />
    </div>
  )
}