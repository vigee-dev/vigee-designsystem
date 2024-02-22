import Image, { StaticImageData } from "next/image";
import React from "react";
import error from "../../img/error/error.svg";
import Link from "next/link";
import { PiEnvelopeArrowRightDuoSolid } from "../../icons/PikaIcons";
import { Button } from "../Buttons/Button";

interface IllustrationProps {
  title?: string;
  title2?: string;
  subtitle?: string;
  children?: React.ReactNode;
}
export default function ErrorIllustration({
  title,
  title2,
  subtitle,
  children,
}: IllustrationProps) {
  return (
    <div className="flex flex-col items-center justify-center  w-full px-12 ">
      {error && (
        <Image
          width={400}
          height={400}
          className="mx-auto  w-44 h-auto"
          src={error}
          alt="Erreur"
        />
      )}
      <h1
        className={
          "text-xl text-primary font-bold text-center pt-6 font-display"
        }
      >
        Une erreur s'est produite.
      </h1>

      <Link
        className="text-sm text-gray-500  flex gap-x-2 items-center text-center font-display"
        href={"mailto:support@vigee.fr"}
      >
        <Button variant="outline">
          Contacter le support <PiEnvelopeArrowRightDuoSolid />
        </Button>
      </Link>

      {children}
    </div>
  );
}
