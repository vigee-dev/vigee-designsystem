import React from "react";
import { useEffect } from "react";
import anime from "animejs";

export const SplashScreen = ({
  finishLoading,
}: {
  finishLoading: () => void;
}) => {
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
    <div className="h-screen w-screen bg-dark">
      <span className="loader"></span>
    </div>
  );
};
