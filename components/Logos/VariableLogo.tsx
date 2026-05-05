/**
 * @description Logo Vigee cliquable (gris ou blanc, taille normale ou grande) avec titre optionnel, wrappé dans un Next.js Link.
 * @useWhen header/navbar de l'application → afficher le logo de marque Vigee | splash screen ou page de login → version blanche sur fond sombre | sidebar → logo compact sans titre
 * @dontUseFor illustration décorative sans navigation → utiliser une balise `<Image>` directement | page d'erreur avec navigation complexe → utiliser PageHeader
 * @example <VariableLogo title="Vigee" href="/dashboard" big white />
 */
import Link from "next/link";
import VigeeGrayLogo from "../../img/logos/VigeeGrayLogo.png";
import VigeeWhiteLogo from "../../img/logos/VigeeWhiteLogo.png";
import Image from "next/image";
import { cn } from "../lib/utils";

interface VariableLogoProps {
  title?: string;
  big?: boolean;
  white?: boolean;
  className?: string;
  href?: string;
}

export default function VariableLogo({
  title,
  big,
  className,
  href,
  white,
}: VariableLogoProps) {
  return (
    <Link href={href ?? "/"} className={className}>
      <div className="flex items-center gap-x-2">
        <Image
          src={white ? VigeeWhiteLogo : VigeeGrayLogo}
          alt="Vigee"
          width={big ? 400 : 300}
          height={big ? 400 : 300}
          className={cn("md:flex mb-1 h-auto", big ? "w-10" : "w-6")}
        />
        <p
          className={cn(
            ` font-variations font-display font-black text-black`,
            big ? "text-4xl" : "text-2xl",
            white ? "text-slate-200" : "text-black"
          )}
        >
          {title}
        </p>
      </div>
    </Link>
  );
}
