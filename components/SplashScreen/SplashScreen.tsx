import React from "react";
import { useEffect } from "react";
import anime from "animejs";
import { cn } from "../../lib/utils";

interface Props {
  className?: string;
  finishLoading: () => void;
}

export const SplashScreen = ({ finishLoading, className }: Props) => {
  useEffect(() => {
    const loaderAnimation = anime.timeline({
      complete: () => {
        finishLoading(); // Cela est appelé une fois l'animation terminée.
      },
    });

    console.log("loaderAnimation", finishLoading);

    loaderAnimation.add({
      targets: "#loader",
      duration: 300,
      delay: 0,
      scale: 1,
      easing: "linear",
    });
  }, [finishLoading]);

  return (
    <div className={cn(`h-screen w-screen bg-primary`, className)}>
      <span className="loader"></span>
    </div>
  );
};
