/**
 * @description Titre de section H2 gras en slate-400, utilisé pour structurer visuellement les blocs d'un formulaire.
 * @useWhen séparation de sections dans un formulaire long → utiliser TitleBold | entête d'un groupe de champs liés → utiliser TitleBold
 * @dontUseFor titre principal de page → utiliser TypographyH1 | titre avec animation → utiliser TitleGradual
 * @example <TitleBold title="Informations personnelles" />
 */
import { TypographyH2 } from "../Typography/Typography";
import { cn } from "../lib/utils";

export const TitleBold = ({
  className,
  title,
}: {
  className?: string;
  title: string;
}) => {
  return (
    <TypographyH2 className={cn("text-slate-400 font-bold text-lg", className)}>
      {title}
    </TypographyH2>
  );
};
