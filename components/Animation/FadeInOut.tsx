/**
 * @description Affiche/masque un contenu avec une animation fade + slide vertical, piloté par un booléen.
 * @useWhen afficher un message contextuel après une action (succès, erreur) → utiliser FadeInOut | révéler un panneau ou section conditionnelle avec transition douce → utiliser FadeInOut | animer l'apparition d'un tooltip ou d'une aide inline → utiliser FadeInOut
 * @dontUseFor transition entre pages ou routes → utiliser FadeIn | contenu toujours visible sans condition → pas besoin d'animation conditionnelle
 * @example <FadeInOut isVisible={isSubmitted}><AlertInfo message="Enregistrement réussi" /></FadeInOut>
 */
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
