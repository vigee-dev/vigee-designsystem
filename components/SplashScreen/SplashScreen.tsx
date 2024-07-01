"use client";

import { useEffect, useState } from "react";
import anime from "animejs";
import { cn } from "../lib/utils";
import GridPattern from "./GridPattern";
import { Progress } from "../ui/progress";

interface Props {
  className?: string;
  finishLoading?: () => void;
}

export const SplashScreen = ({ finishLoading, className }: Props) => {
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
      easing: "linear",
    });
  }, [finishLoading]);

  return (
    <div
      className={cn(
        "flex h-screen w-screen  bg-slate-50 items-center justify-center",
        className
      )}
    >
      <span className="loader"></span>

      <GridPattern
        width={50}
        height={50}
        numSquares={10}
        maxOpacity={0.2}
        duration={1}
        repeatDelay={0.5}
        x={100}
        y={100}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "absolute inset-0 h-full w-full skew-y-12"
        )}
      />
    </div>
  );
};
