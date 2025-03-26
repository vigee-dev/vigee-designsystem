import Image, { StaticImageData } from "next/image";
import error from "../../img/error/error.svg";
import errorBro from "../../img/error/error-bro.svg";
import Link from "next/link";
import { PiEnvelopeArrowRightDuoSolid } from "../../icons/PikaIcons";
import { Button } from "../Buttons/Button";

interface IllustrationProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  supportEmail?: string;
  img?: StaticImageData;
  onClick?: () => void;
  variant?: "bro" | "classic";
}
export function Error({ title, subtitle, children, supportEmail, onClick, variant = "bro", img = error }: IllustrationProps) {
  const image = variant === "bro" ? errorBro : img;
  return (
    <div className="flex flex-col items-center justify-center text-center  w-full px-12 max-w-xl gap-2">
      <Image width={400} height={400} className="mx-auto w-64 h-64" src={image} alt="Erreur" />
      <h1 className={"text-xl text-primary font-bold text-center pt-6 font-display"}>{title ? title : "Une erreur s'est produite."}</h1>

      {subtitle && <p className="text-gray-400">{subtitle}</p>}

      {supportEmail && (
        <Link className="text-sm text-gray-500  items-center text-center font-display" href={supportEmail ? `mailto:${supportEmail}` : "/"}>
          <Button variant="outline" className=" flex gap-x-2">
            Contacter le support <PiEnvelopeArrowRightDuoSolid />
          </Button>
        </Link>
      )}

      {children}

      {onClick && (
        <Button onClick={onClick} className="py-2">
          Rééssayer
        </Button>
      )}
    </div>
  );
}
