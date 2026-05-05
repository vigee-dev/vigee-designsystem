/**
 * @description Écran de chargement plein écran animé (spinner + grille SVG) affiché au démarrage de l'application avant le rendu principal.
 * @useWhen initialisation de l'app Next.js avant hydratation → afficher SplashScreen | attente d'un chargement global (auth, config) → masquer le contenu avec SplashScreen | thème sombre activé → passer `dark` pour adapter les couleurs.
 * @dontUseFor chargement de sections partielles → utiliser LoaderPage | indicateur de rechargement de données → utiliser RefetchIndicator | skeleton de dashboard → utiliser DashboardSkeleton.
 * @example <SplashScreen finishLoading={() => setReady(true)} dark={false} />
 */
"use client";

import { useEffect, useState } from "react";
import anime from "animejs";
import { cn } from "../lib/utils";
import GridPattern from "./GridPattern";

interface Props {
  className?: string;
  dark?: boolean;
  finishLoading?: () => void;
}

export const SplashScreen = ({ finishLoading, className, dark }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loaderAnimation = anime.timeline({
      complete: () => {
        setProgress(100);
        finishLoading && finishLoading();
      },
    });

    loaderAnimation.add({
      targets: "#loader",
      duration: 300,
      delay: 0,
      scale: 1,
      easing: "easeInOutSine",
    });
  }, [finishLoading]);

  return (
    <div
      className={cn(
        "flex h-screen max-h-screen w-screen  bg-white items-center justify-center",
        className,
        dark ? "bg-slate-900 text-white" : ""
      )}
    >
      <span
        className={cn(
          "border-[7px] bg-white p-[10px] animate-[spin_2s_linear_infinite] border-t-[7px] border-t-solid border-t-primary border-t-6 border-t-111 rounded-full transition-transform  ease-in-outout z-50",
          className,
          dark
            ? "bg-slate-900 border-slate-400 border-t-slate-100 text-white"
            : ""
        )}
      ></span>
      <GridPattern
        width={50}
        height={50}
        numSquares={30}
        maxOpacity={0.4}
        duration={1}
        repeatDelay={1}
        x={150}
        y={120}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] ",
          "absolute inset-0 h-full w-full skew-y-12 animate-pulse text-primary",
          dark ? "text-white" : ""
        )}
      />
    </div>
  );
};
