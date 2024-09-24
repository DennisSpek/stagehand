import { HorizontalSeperator } from '@/ui/horizontalSeperator'
import { Plan } from '@/types/PackagePlan';

export const PaymentSummary = ({ plan }: Plan) => {
  return (
    <div className='bg-white border border-lightGray rounded-sm p-[25px] max-w-[400px] w-full'>
      <label>Payment summary</label>
      <div className='flex gap-4'>
        <div>
          <input type='radio'></input>
          <span>Annual</span>
        </div>
        <div>
          <input type='radio'></input>
          <span>Monthly</span>
        </div>
      </div>
      <HorizontalSeperator className='my-5' />
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <span>{plan.name}</span>
          <span>1x 12 months</span>
        </div>
        <div className='flex flex-col'>
          <span>€ {plan.price.monthly}</span>
          <span>€ {plan.price.yearly}</span>
        </div>
      </div>
      <HorizontalSeperator className='my-5' />
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <span>Subtotal</span>
          <span>Taxes (21%)</span>
        </div>
        <div className='flex flex-col'>
          <span>€ {plan.price.monthly}</span>
          <span>€ {plan.price.yearly}</span>
        </div>
      </div>
      <div>
        <span>Total</span>
        <span>€ {plan.price.monthly}</span>
      </div>
    </div>
  )
}