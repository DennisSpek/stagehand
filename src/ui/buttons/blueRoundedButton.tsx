import { motion } from 'framer-motion';

interface ButtonProps {
  disabled: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export const BlueRoundedButton = ({ disabled, children, onClick } : ButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className='rounded-xl text-white font-bold w-full p-4 py-3 min-w-[170px]'
      type='submit'
      animate={{ backgroundColor: disabled ? '#D4D7F7' : '#5650F5' }} // Tailwind colors in hex
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
};