"use client";

import { useState } from "react";
import { SplashScreen } from "./SplashScreen";

export default function SplashScreenManager({ className, dark, children }: { className?: string; dark?: boolean; children: React.ReactNode }) {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const finishLoading = () => {
    setShowSplashScreen(false);
  };

  return showSplashScreen ? (
    <div className="h-screen items-center mx-auto flex justify-center">
      <SplashScreen finishLoading={finishLoading} className={className} dark={dark} />
    </div>
  ) : (
    children
  );
}
