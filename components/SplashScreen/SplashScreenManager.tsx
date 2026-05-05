/**
 * @description Affiche un écran de chargement (SplashScreen) au premier rendu, puis remplace par le contenu enfant une fois l'animation terminée.
 * @useWhen initialisation d'une app Next.js pour masquer le chargement initial → SplashScreenManager | wrapping du layout racine pour une intro animée avant affichage du contenu | mode sombre activé sur le splash → passer `dark`
 * @dontUseFor transitions entre pages → utiliser FadeIn | états de chargement de données → utiliser LoaderPage
 * @example <SplashScreenManager dark><App /></SplashScreenManager>
 */
"use client";

import { useState } from "react";
import { SplashScreen } from "./SplashScreen";

export default function SplashScreenManager({ className, dark, children }: { className?: string; dark?: boolean; children: React.ReactNode }) {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const finishLoading = () => {
    setShowSplashScreen(false);
  };

  return showSplashScreen ? (
    <div className="h-screen items-center mx-auto flex justify-center max-h-screen">
      <SplashScreen finishLoading={finishLoading} className={className} dark={dark} />
    </div>
  ) : (
    children
  );
}
