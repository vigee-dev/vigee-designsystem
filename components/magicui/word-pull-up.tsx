/**
 * @description Titre animé h1 où chaque mot apparaît en remontant progressivement avec un effet stagger framer-motion.
 * @useWhen splash screen ou hero section nécessitant un titre d'accroche animé | page d'accueil avec headline impactante | SplashScreen Vigee pour animer le titre principal.
 * @dontUseFor body text ou paragraphes → utiliser TypographyH1 | titres statiques sans animation → utiliser TitleGradual | sous-titres de section → utiliser TitleBold.
 * @example <WordPullUp words="Bienvenue sur Vigee" className="text-primary" />
 */
"use client";

import { motion, Variants } from "framer-motion";

import { cn } from "../lib/utils";

interface WordPullUpProps {
  words: string;
  delayMultiple?: number;
  wrapperFramerProps?: Variants;
  framerProps?: Variants;
  className?: string;
}

export default function WordPullUp({
  words,
  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  className,
}: WordPullUpProps) {
  return (
    <motion.h1 variants={wrapperFramerProps} initial="hidden" animate="show" className={cn("font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm", className)}>
      {words.split(" ").map((word, i) => (
        <motion.span key={i} variants={framerProps} style={{ display: "inline-block", paddingRight: "8px" }}>
          {word === "" ? <span>&nbsp;</span> : word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
