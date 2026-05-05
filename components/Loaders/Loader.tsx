/**
 * @description Indicateur de chargement centré avec logo Vigee animé (spin + pulse) et texte optionnel.
 * @useWhen chargement d'une page ou section entière → afficher Loader | besoin d'un logo custom pendant le chargement → passer `logo` | couleur de bordure à adapter à un thème → passer `borderColor`
 * @dontUseFor spinner léger inline → utiliser Spinner | chargement d'une page complète avec layout → utiliser LoaderPage
 * @example <Loader text="Chargement en cours..." />
 */
import VigeeLoaderTransparent from "../../img/logos/VigeeGrayLogo.png";
import Image, { StaticImageData } from "next/image";

interface Props {
  text?: String;
  logo?: StaticImageData;
  borderColor?: String;
}

export const Loader = ({ text, logo, borderColor }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-2 p-12">
      <div className="relative flex items-center justify-center">
        <div
          className={`absolute h-28 w-28 border-2 ${
            borderColor ? borderColor : "border-slate-300"
          } rounded-full animate-spin border-t-transparent`}
        />

        <Image
          src={logo ? logo : VigeeLoaderTransparent}
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
