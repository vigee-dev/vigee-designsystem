import Image, { StaticImageData } from "next/image";
import React from "react";
import emptyMan from "../../img/empty/empty-man.svg";
import emptyIdeas from "../../img/empty/empty-ideas.svg";
import Link from "next/link";
import { Button } from "../Buttons/Button";
import { PiPlusCircleContrast } from "../../icons/PikaIcons";
import { PlusButton } from "../Buttons/PlusButton";
import { Container } from "../Container/Container";

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
  type = "emptyMan",
}: IllustrationProps) {
  return (
    <Container className="flex flex-col items-center justify-center  w-full px-12 p-8">
      <Image
        width={400}
        height={400}
        className="mx-auto w-64 h-auto"
        src={type === "emptyIdeas" ? emptyIdeas : emptyMan}
        alt="Empty list"
      />

      <h1
        className={
          "text-xl text-gray-500 font-bold text-center pt-6 font-display"
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
          {buttonText ? (
            <Button variant="outline" className="flex gap-x-2">
              {buttonText}
            </Button>
          ) : (
            <PlusButton />
          )}
        </Link>
      )}

      {children}
    </Container>
  );
}
