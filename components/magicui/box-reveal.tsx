/**
 * @description Anime l'apparition d'un élément avec un bloc coloré qui glisse pour révéler le contenu au scroll.
 * @useWhen titres ou textes hero à révéler au scroll → BoxReveal | mise en valeur d'un KPI ou stat clé sur une landing | animation d'onboarding ou splash screen pour attirer l'attention
 * @dontUseFor listes entières à animer → utiliser AnimatedListItem | animations de page globales → utiliser FadeIn
 * @example <BoxReveal boxColor="#5046e6" duration={0.5}><h1>Bienvenue sur Vigee</h1></BoxReveal>
 */
"use client";

import { useEffect, useRef, type JSX } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface BoxRevealProps {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  boxColor?: string;
  duration?: number;
}

export const BoxReveal = ({
  children,
  width = "fit-content",
  boxColor,
  duration,
}: BoxRevealProps) => {
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      slideControls.start("visible");
      mainControls.start("visible");
    } else {
      slideControls.start("hidden");
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: duration ? duration : 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: duration ? duration : 0.5, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor ? boxColor : "#5046e6",
        }}
      />
    </div>
  );
};

export default BoxReveal;
