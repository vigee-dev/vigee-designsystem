import Image, { StaticImageData } from "next/image";
import React from "react";
import error from "../../img/error/error.svg";
import Link from "next/link";

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
          className="mx-auto h-32 w-auto"
          src={error}
          alt="Erreur"
        />
      )}
      <h1
        className={
          "text-xl text-gray-300 font-black text-center pt-6 font-display"
        }
      >
        Une erreur s'est produite.
      </h1>

      <Link
        className="text-xl text-slate-500   text-center font-display"
        href={"mailto:support@vigee.fr"}
      >
        Contacter le support
      </Link>

      {children}
    </div>
  );
}