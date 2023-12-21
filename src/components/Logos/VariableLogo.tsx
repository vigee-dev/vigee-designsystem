import React from "react";
import VigeeGrayLogo from "../../img/logos/VigeeGrayLogo.png";
import Image from "next/image";

interface VariableLogoProps {
  title?: string;
  big?: boolean;
}

export default function VariableLogo({ title, big }: VariableLogoProps) {
  return (
    <div className="flex items-center gap-x-1">
      <Image
        src={VigeeGrayLogo}
        alt="Vigee"
        width={big ? 40 : 30}
        height={big ? 40 : 30}
        className="md:flex mb-1"
      />
      <p
        className={`font-display font-black text-black ${
          big ? "text-4xl" : "text-2xl"
        }`}
      >
        {title}
      </p>
    </div>
  );
}
