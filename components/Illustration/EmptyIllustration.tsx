import Image, { StaticImageData } from "next/image";
import React from "react";
import emptyMan from "../../img/empty/empty-man.svg";
import emptyIdeas from "../../img/empty/empty-ideas.svg";
import Link from "next/link";
import { Button } from "../Buttons/Button";

interface IllustrationProps {
  text?: string;
  buttonLink?: string;
  buttonText?: string;
  subtitle?: string;
  children?: React.ReactNode;
  supportEmail?: string;
  type?: "emptyMan" | "emptyIdeas";
}
export default function EmptyIllustration({
  text,
  subtitle,
  buttonLink,
  buttonText,
  children,
  type = "emptyIdeas",
}: IllustrationProps) {
  return (
    <div className="flex flex-col items-center justify-center  w-full px-12 ">
      <Image
        width={400}
        height={400}
        className="mx-auto w-64 h-auto"
        src={type === "emptyIdeas" ? emptyIdeas : emptyMan}
        alt="Empty list"
      />

      <h1
        className={
          "text-xl text-primary font-bold text-center pt-6 font-display"
        }
      >
        {text}
      </h1>

      <p className="text-gray-400">{subtitle}</p>

      {buttonLink && (
        <Link
          className="text-sm text-gray-500  items-center text-center font-display pt-2"
          href={`${buttonLink}`}
        >
          <Button variant="outline" className="flex gap-x-2">
            {buttonText}
          </Button>
        </Link>
      )}

      {children}
    </div>
  );
}
