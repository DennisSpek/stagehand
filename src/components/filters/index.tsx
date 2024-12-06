import { FaCalendarDays } from "react-icons/fa6";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface FiltersProps {
  filter: '1W' | '1M' | '6M' | '1Y';
  setFilter: (filter: '1W' | '1M' | '6M' | '1Y') => void;
}

const Filters = ({ filter, setFilter }: FiltersProps) => {
  return (
    <>
      <div className='h-8 px-2 bg-white flex rounded-sm'>
        <button
          className={`w-[33px] flex items-center justify-center text-sm hover:bg-lighterBlue transition-colors duration-200 ${filter === '1W' ? 'bg-lighterBlue' : ''}`}
          onClick={() => setFilter('1W')}
        >
          1W
        </button>
        <button
          className={`w-[33px] flex items-center justify-center text-sm hover:bg-lighterBlue transition-colors duration-200 ${filter === '1M' ? 'bg-lighterBlue' : ''}`}
          onClick={() => setFilter('1M')}
        >
          1M
        </button>
        <button
          className={`w-[33px] flex items-center justify-center text-sm hover:bg-lighterBlue transition-colors duration-200 ${filter === '6M' ? 'bg-lighterBlue' : ''}`}
          onClick={() => setFilter('6M')}
        >
          6M
        </button>
        <button
          className={`w-[33px] flex items-center justify-center text-sm hover:bg-lighterBlue transition-colors duration-200 ${filter === '1Y' ? 'bg-lighterBlue' : ''}`}
          onClick={() => setFilter('1Y')}
        >
          1Y
        </button>
        <button className='w-[33px] flex items-center justify-center hover:bg-lighterBlue transition-colors duration-200'>
          <FaCalendarDays />
        </button>
      </div>
      <div className='py-1.5 px-3 bg-white rounded-sm flex items-center gap-1 hover:bg-lighterBlue transition-colors duration-200 cursor-pointer'>
        <FaArrowLeft className='transform scale-x-70' />
        <span className='text-sm'>Period</span>
        <FaArrowRight className='transform scale-x-70' />
      </div>
    </>
  ); 
}

export default Filters