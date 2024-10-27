import { Plan } from '@/types/lemonSqueezy/packagePlan';
import { CheckMark } from '@/icons/checkmark'
import { HorizontalSeperator } from '@/ui/horizontalSeperator'

interface PackageCardProps  {
  callback: (plan: Plan) => void;
  plan: Plan;
}

export const PackageCard = ( props : PackageCardProps) => {
  const { callback, plan: { name, price, features, description, trial}} = props;

  return(
    <div className='w-[280px] flex flex-col items-center'>
      <div onClick={() => callback(props.plan)} className='bg-white w-full h-[440px] rounded-normal border border-lightGray flex flex-col justify-between cursor-pointer transform transition-transform duration-300 hover:scale-105'>
        <div className='px-10 py-6 flex flex-col justify-between h-[400px]'>
          <div className=''>
            <label className='text-vividBlue text-normal font-bold'>{name}</label>
            <div className='flex flex-col'>
              <h3 className='text-xl font-bold'>{price.monthly}/mo</h3>
              <span className='text-darkGray text-sm'>Or annually at {price.yearly}</span>
            </div>
            <HorizontalSeperator className='w-4/6'/>
          </div>
          <ul className='mt-4 flex-1'>
            {features.map((feature, index) => (
              <li key={index} className='flex items-center gap-2 text-darkGray text-normal'>
                <CheckMark />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          {description}
        </div>
        { trial && (
          <button className='bg-vividBlue w-full rounded-b-normal p-2.5 text-white'>Start a Free Trial</button>
        )}
      </div>
      { trial && (
        <span className='text-sm text-gray mt-2'>14 days free. No credit card required.</span>
      )}
    </div>
  )
}