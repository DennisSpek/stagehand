import clsx from 'clsx';
import { Plan } from '@ui/packageCard';
import { CheckMark } from '@/icons/checkmark'

interface PackageCardProps extends Plan {
  callback: () => {};
}

export const PackageCardSmall = ( props : PackageCardProps) => {
  const { name, price, trial, callback, selectedPlan} = props;

  const isSelected = selectedPlan?.name === name;

  return(
    <div className='w-[280px] flex flex-col items-center'>
      <div onClick={() => callback(props)}         className={`relative w-full min-h-[95px] rounded-normal border border-lightGray flex flex-col justify-between cursor-pointer ${isSelected ? 'bg-vividBlue' : 'bg-white'}`}>
        { trial && (
          <span className='absolute rounded-normal bg-vividBlue right-3 -top-3 text-white px-2 py-1 text-sm'>Free Trial Included</span>
        )}
        <div className='px-10 py-3'>
          <label className={`${isSelected ? 'text-white' : 'text-vividBlue'} text-normal font-bold`}>{name}</label>
          <div className='flex flex-col'>
            <h3 className={` ${isSelected ? 'text-white' : 'text-black'} text-xl font-bold`}>€{price.monthly}/mo</h3>
            <span className={` ${isSelected ? 'text-white' : 'text-darkGray'} text-sm `}>Or annually at €{price.yearly}</span>
          </div>
        </div>
      </div>
      { trial && (
        <span className='text-sm text-gray mt-2'>14 days free. No credit card required.</span>
      )}
    </div>
  )
}