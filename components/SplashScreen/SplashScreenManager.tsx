"use client";

import { useState, useEffect } from "react";
import { SplashScreen } from "./SplashScreen";

export default function SplashScreenManager({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const finishLoading = () => {
    setShowSplashScreen(false);
  };

  return showSplashScreen ? (
    <div className="h-screen items-center mx-auto flex justify-center">
      <SplashScreen finishLoading={finishLoading} />
    </div>
  ) : (
    children
  );
}
