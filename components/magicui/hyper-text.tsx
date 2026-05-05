/**
 * @description Affiche un texte avec un effet de déchiffrement lettre par lettre, rejoué au survol de la souris.
 * @useWhen titre de page ou hero section avec animation d'entrée → utiliser HyperText | texte décoratif à révéler au survol → utiliser HyperText | mise en valeur d'un mot-clé dans un SplashScreen ou landing → utiliser HyperText
 * @dontUseFor contenu textuel long ou paragraphe → utiliser TypographyH1 | texte animé mot par mot → utiliser WordPullUp | révélation progressive d'un bloc entier → utiliser BoxReveal
 * @example <HyperText text="VIGEE" duration={600} className="text-4xl text-primary" />
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

import { cn } from "../lib/utils";

interface HyperTextProps {
  text: string;
  duration?: number;
  framerProps?: Variants;
  className?: string;
  animateOnLoad?: boolean;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export default function HyperText({
  text,
  duration = 800,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
  className,
  animateOnLoad = true,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text.split(""));
  const [trigger, setTrigger] = useState(false);
  const interations = useRef(0);
  const isFirstRender = useRef(true);

  const triggerAnimation = () => {
    interations.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animateOnLoad && isFirstRender.current) {
        clearInterval(interval);
        isFirstRender.current = false;
        return;
      }
      if (interations.current < text.length) {
        setDisplayText(t => t.map((l, i) => (l === " " ? l : i <= interations.current ? text[i] : alphabets[getRandomInt(26)])));
        interations.current = interations.current + 0.1;
      } else {
        setTrigger(false);
        clearInterval(interval);
      }
    }, duration / (text.length * 10));
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [text, duration, trigger, animateOnLoad]);

  return (
    <div className="overflow-hidden py-2 flex cursor-default scale-100" onMouseEnter={triggerAnimation}>
      <AnimatePresence mode="wait">
        {displayText.map((letter, i) => (
          <motion.h1 key={i} className={cn("font-mono", letter === " " ? "w-3" : "", className)} {...framerProps}>
            {letter.toUpperCase()}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
}
