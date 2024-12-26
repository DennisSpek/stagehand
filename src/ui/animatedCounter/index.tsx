import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export const Counter = ({ number }: { number: number }) => {
  const count = useMotionValue(0);
  const duration = Math.floor(Math.random() * 4) + 3; // Generates a whole number between 3 and 6

  useEffect(() => {
    const controls = animate(count, number, {
      duration,
    });
    return () => controls.stop();
  }, [number, duration]);

  const roundedCount = useTransform(count, (value) => Math.floor(value));

  return (
    <motion.pre>
      {roundedCount}
    </motion.pre>
  );
};