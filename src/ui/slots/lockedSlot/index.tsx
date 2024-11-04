import { FaLock } from 'react-icons/fa';
import cslx from 'clsx';

interface LockedSlotProps {
  className?: string;
}

export const LockedSlot = ({ className }: LockedSlotProps) => {
  return (
    <div className='items-center flex flex-col'>
      <div className={cslx(className, 'w-[100px] h-[100px] bg-lightGray rounded-full flex items-center justify-center m-1')}>
        <FaLock fill='#727272' />
      </div>
    </div>
  );
};