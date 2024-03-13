import Image, { StaticImageData } from "next/image";
import React from "react";
import empty from "../../img/empty/empty.svg";
import Link from "next/link";
import { PiEnvelopeArrowRightDuoSolid } from "../../icons/PikaIcons";
import { Button } from "../Buttons/Button";

interface IllustrationProps {
  text?: string;
  buttonLink?: string;
  buttonText?: string;
  subtitle?: string;
  children?: React.ReactNode;
  supportEmail?: string;
}
export default function EmptyIllustration({
  text,
  subtitle,
  buttonLink,
  buttonText,
  children,
  supportEmail = "support@vigee.fr",
}: IllustrationProps) {
  return (
    <div className="flex flex-col items-center justify-center  w-full px-12 ">
      {empty && (
        <Image
          width={400}
          height={400}
          className="mx-auto w-64 h-auto"
          src={empty}
          alt="Erreur"
        />
      )}
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
          className="text-sm text-gray-500  items-center text-center font-display"
          href={buttonLink ? `mailto:${buttonLink}` : "/"}
        >
          <Button variant="outline" className=" flex gap-x-2">
            {buttonText} <PiEnvelopeArrowRightDuoSolid />
          </Button>
        </Link>
      )}

      {children}
    </div>
  );
}
