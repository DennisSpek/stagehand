import { motion } from 'framer-motion';

export const CheckboxNormal = ({ active, name, onClick } : { active: boolean, name: string, onClick: () => void}) => {
  return (
    <div key={name} onClick={onClick} className='w-[20px] h-[20px] bg-white rounded-tiny border border-lightGray flex items-center justify-center'>
      {active && (
        <motion.div
          className='w-[16px] h-[16px] bg-vividBlue rounded-tiny/2'
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.15 }}
        ></motion.div>
      )}
    </div>
  );
};