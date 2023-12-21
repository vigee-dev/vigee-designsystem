import React from "react";
import VigeeLoaderTransparent from "../../img/logos/VigeeGrayLogo.png";
import Image from "next/image";

interface Props {
  text?: String;
}

export const Loader = ({ text }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-2 p-12 h-screen">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-28 w-28 border-2 border-gray-300 rounded-full animate-spin border-t-transparent" />

        <Image
          src={VigeeLoaderTransparent}
          alt="logo"
          width={50}
          height={40}
          className="animate-pulse"
        />
      </div>
      <p className="text-primary-foreground text-sm">{text}</p>
    </div>
  );
};
