/**
 * @description Affiche un nombre animé qui défile jusqu'à sa valeur cible dès que le composant entre dans le viewport.
 * @useWhen afficher un KPI chiffré avec effet d'animation au scroll → utiliser NumberTicker | mettre en valeur un compteur (CA, utilisateurs, score) sur une page de dashboard ou landing | animer un chiffre en sens inverse (countdown) → passer direction="down"
 * @dontUseFor valeur non numérique ou texte formaté complexe → utiliser KPI | affichage statique sans animation → utiliser NumberKPI
 * @example <NumberTicker value={42000} direction="up" delay={0.3} className="text-4xl font-bold" />
 */
"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

import { cn } from "../lib/utils";

export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number; // delay in s
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    isInView &&
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(
    () =>
      springValue.on("change", latest => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(Number(latest.toFixed(0)));
        }
      }),
    [springValue]
  );

  return <span className={cn("inline-block tabular-nums text-black dark:text-white tracking-wider", className)} ref={ref} />;
}
