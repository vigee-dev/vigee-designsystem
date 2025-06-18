"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PiRepeatRectangularSolid, 
  PiSpinnerDuoStroke, 
  PiCheckTickCircleDuoSolid 
} from '../../icons/PikaIcons';

interface RefetchIndicatorProps {
  isRefetching: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

type IndicatorState = 'idle' | 'loading' | 'success';

export const RefetchIndicator: React.FC<RefetchIndicatorProps> = ({
  isRefetching,
  className = '',
  size = 'md'
}) => {
  const [state, setState] = useState<IndicatorState>('idle');

  useEffect(() => {
    if (isRefetching) {
      setState('loading');
    } else if (state === 'loading') {
      setState('success');
      const timer = setTimeout(() => {
        setState('idle');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isRefetching, state]);

  const iconSizeClass = size === 'sm' ? 'h-6 w-6 p-1' : 'h-8 w-8 p-1.5';

  const getIcon = () => {
    switch (state) {
      case 'loading':
        return (
          <PiSpinnerDuoStroke
            className={`text-green-500 ${iconSizeClass} rounded-xl animate-spin`}
          />
        );
      case 'success':
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <PiCheckTickCircleDuoSolid
              className={`text-green-500 ${iconSizeClass} rounded-xl`}
            />
          </motion.div>
        );
      case 'idle':
      default:
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <PiRepeatRectangularSolid
              className={`text-green-500 ${iconSizeClass} rounded-xl`}
            />
          </motion.div>
        );
    }
  };

  return (
    <div className={`absolute top-1 right-1 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {getIcon()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RefetchIndicator;
