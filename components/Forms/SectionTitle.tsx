/**
 * @description Titre de section H2 stylisé avec sous-titre optionnel pour structurer visuellement un formulaire ou une page.
 * @useWhen séparation de groupes de champs dans un formulaire long → utiliser SectionTitle | introduction d'une section de contenu avec description courte → utiliser SectionTitle
 * @dontUseFor titre principal de page → utiliser PageHeader | titre avec animation → utiliser TitleGradual ou TypographyH1
 * @example <SectionTitle title="Informations personnelles" subtitle="Renseignez vos coordonnées de contact." />
 */
import { cn } from "../lib/utils";
import { TypographyH2 } from "../Typography/Typography";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionTitle = ({
  title,
  subtitle,
  className,
}: SectionTitleProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <TypographyH2 className="text-primary font-bold text-2xl">
        {title}
      </TypographyH2>
      <p className="text-sm text-slate-400 font-disaply font-variations">
        {subtitle}
      </p>
    </div>
  );
};
