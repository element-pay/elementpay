"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedFeedbackItemProps {
  children: ReactNode;
}

export const AnimatedFeedbackItem: React.FC<AnimatedFeedbackItemProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-1"
    >
      {children}
    </motion.div>
  );
};
