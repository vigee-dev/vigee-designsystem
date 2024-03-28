import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import anime from "animejs";
import loader from "../../img/loaders/loader.gif";

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
    <div>
      <Image id={"loader"} src={loader} alt="loading" width={60} height={60} />
    </div>
  );
};
