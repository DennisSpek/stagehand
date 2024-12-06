import { ElementContainer } from '@/ui/elementContainer'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6'
import clsx from 'clsx'

interface MetricCardProps {
  head: { title: string, description: string };
  data: { total: string, change: number; }
  active: boolean;
  onClick?: () => void;
}

const MetricCard = ({ head, data, active, onClick }: MetricCardProps) => {
  const { title, description } = head;
  const { total, change } = data;

  return (
    <ElementContainer className={clsx(`p-4 w-[200px] ${active && 'border-vividBlue bg-lighterBlue'}`)}>
      <div className='flex justify-between items-center'>
        <label className='text-sm'>{title}</label>
        <i>i</i>
      </div>
      <h2 className='text-xxl'>{total}</h2>
      
      <div className='flex items-center gap-1'>
        {change > 0 ? (
          <>
            <FaArrowUp className='text-positiveGreen'/>
            <span className='text-sm font-bold text-positiveGreen'>{change}%</span>
          </>
        ) : (
          <>
            <FaArrowDown className='text-red-500'/>
            <span className='text-sm font-bold text-red-500'>{change}%</span>
          </>
        )}
      </div>
    </ElementContainer>
  )
}

export default MetricCard