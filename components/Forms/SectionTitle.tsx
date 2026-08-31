/**
 * @description Titre de section H2 stylisé avec sous-titre optionnel pour structurer visuellement un formulaire ou une page.
 * @useWhen séparation de groupes de champs dans un formulaire long → utiliser SectionTitle | introduction d'une section de contenu avec description courte → utiliser SectionTitle
 * @dontUseFor titre principal de page → utiliser PageHeader | titre avec animation → utiliser TitleGradual ou TypographyH1
 * @example <SectionTitle title="Informations personnelles" subtitle="Renseignez vos coordonnées de contact." />
 * @example <SectionTitle title="Équipe Vigee" variant="muted" />
 */
import { cn } from "../lib/utils";
import { TypographyH2 } from "../Typography/Typography";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  /**
   * `default` : titre d'accent, pour ouvrir une page ou une section principale.
   * `muted` : titre gris, pour regrouper des champs à l'intérieur d'un même
   * formulaire sans concurrencer le titre de la page.
   */
  variant?: "default" | "muted";
}

export const SectionTitle = ({
  title,
  subtitle,
  className,
  variant = "default",
}: SectionTitleProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <TypographyH2
        className={cn(
          "font-bold text-2xl",
          variant === "muted" ? "text-slate-400" : "text-primary",
        )}
      >
        {title}
      </TypographyH2>
      {subtitle && (
        <p className="text-sm text-slate-400 font-disaply font-variations">
          {subtitle}
        </p>
      )}
    </div>
  );
};
