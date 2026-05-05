/**
 * @description Anime l'apparition d'un bloc en fondu + glissement vers le haut au scroll, avec support du mode reduced-motion et du stagger group.
 * @useWhen révéler une section ou carte au scroll → utiliser FadeIn | animer une liste d'éléments en cascade au scroll → envelopper avec FadeInStagger et mettre chaque item dans FadeIn | landing page / page marketing avec animations d'entrée → utiliser FadeInStagger + FadeIn
 * @dontUseFor transitions conditionnelles show/hide → utiliser FadeInOut | animations complexes de liste avec état → utiliser AnimatedListItem
 * @example <FadeInStagger faster><FadeIn><Card /></FadeIn><FadeIn><Card /></FadeIn></FadeInStagger>
 */
"use client";

import { createContext, useContext } from "react";
import { motion, useReducedMotion } from "framer-motion";

const FadeInStaggerContext = createContext(false);

const viewport = { once: true, margin: "0px 0px -200px" };

export function FadeIn(
  props: React.ComponentPropsWithoutRef<typeof motion.div>
) {
  let shouldReduceMotion = useReducedMotion();
  let isInStaggerGroup = useContext(FadeInStaggerContext);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport,
          })}
      {...props}
    />
  );
}

export function FadeInStagger({
  faster = false,
  ...props
}: React.ComponentPropsWithoutRef<typeof motion.div> & { faster?: boolean }) {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  );
}
