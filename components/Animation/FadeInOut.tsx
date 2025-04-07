"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface FadeInOutProps {
  children: ReactNode;
  isVisible: boolean;
  duration?: number;
  className?: string;
}

export const FadeInOut = ({ children, isVisible, duration = 0.3, className }: FadeInOutProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={className}
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -10,
          }}
          transition={{
            duration: duration,
            ease: "easeInOut",
          }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
