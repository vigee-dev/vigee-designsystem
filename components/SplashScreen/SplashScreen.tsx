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
      <span className="border-[10px] bg-white p-[30px] animate-[spin_2s_linear_infinite] border-t-[10px] border-t-solid border-t-black border-t-10 border-t-111 rounded-full transition-transform  ease-in-outout z-50"></span>
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
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "absolute inset-0 h-full w-full skew-y-12 animate-pulse"
        )}
      />
    </div>
  );
};
