"use client";

import { useEffect, useState } from "react";
import anime from "animejs";
import { cn } from "../lib/utils";
import GridPattern from "./GridPattern";

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
      easing: "easeInOutSine",
    });
  }, [finishLoading,]);

  return (
    <div
      className={cn(
        "flex h-screen w-screen  bg-white items-center justify-center",
        className
      )}
    >
      <span className="border-[10px]  bg-white p-[20px] animate-[spin_2s_linear_infinite] border-t-[10px] border-t-solid border-t-primary border-t-10 border-t-111 rounded-full transition-transform  ease-in-outout z-50"></span>
      <GridPattern
        width={50}
        height={50}
        numSquares={30}
        maxOpacity={0.4}
        duration={1}
        repeatDelay={10}
        x={150}
        y={120}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] ",
          "absolute inset-0 h-full w-full skew-y-12 animate-pulse text-primary"
        )}
      />
    </div>
  );
};
