/**
 * @description Loader pleine page centré avec spinner animé, logo Vigee pulsant et texte optionnel — bloque toute l'interface pendant un chargement global.
 * @useWhen chargement initial d'une page entière (SSR/CSR) → utiliser LoaderPage | attente d'une authentification ou redirection → utiliser LoaderPage | splash screen de chargement avec branding personnalisé → utiliser LoaderPage
 * @dontUseFor chargement d'un bloc partiel → utiliser Loader | indicateur de rechargement discret → utiliser RefetchIndicator | skeleton de dashboard → utiliser DashboardSkeleton
 * @example <LoaderPage text="Chargement en cours..." />
 */
import VigeeLoaderTransparent from "../../img/logos/VigeeGrayLogo.png";
import Image, { StaticImageData } from "next/image";

interface Props {
  text?: String;
  logo?: StaticImageData;
  borderColor?: String;
}

export const LoaderPage = ({ text, logo, borderColor }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-2 p-12 h-screen">
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
