import Image, { StaticImageData } from "next/image";
import React from "react";

interface IllustrationProps {
  title?: string;
  title2?: string;
  subtitle?: string;
  img?: StaticImageData;
}
export default function Illustration({
  title,
  title2,
  subtitle,
  img,
}: IllustrationProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-primary h-screen w-full px-12 ">
      {img && (
        <Image
          width={200}
          height={200}
          className="mx-auto h-96 w-auto"
          src={img}
          alt="Vigee Web"
        />
      )}
      <h1
        className={
          "text-5xl text-gray-300 font-black text-center pt-6 font-display"
        }
      >
        {title} <span className="text-white">{title2}</span>
      </h1>
      {subtitle && (
        <p className="text-xl text-slate-500   text-center font-display">
          {" "}
          {subtitle}{" "}
        </p>
      )}
    </div>
  );
}
