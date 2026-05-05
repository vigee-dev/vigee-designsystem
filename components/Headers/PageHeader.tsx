/**
 * @description Bandeau de titre de page avec sous-titre optionnel, icône et zone d'actions à droite.
 * @useWhen en-tête d'une page principale avec titre + boutons d'action → utiliser PageHeader | page avec contexte visuel → ajouter `icon` et `subtitle` | section sans fond blanc (tableau de bord) → utiliser `variant="ghost"`
 * @dontUseFor titre de section interne dans une page → utiliser SectionTitle | titre de carte ou panneau → utiliser RoundedContainer
 * @example <PageHeader title="Projets" subtitle="Liste de vos projets actifs" icon={<FolderIcon />}><Button icon="add" onClick={handleAdd} /></PageHeader>
 */
import { TypographyH2 } from "../Typography/Typography";
import { cn } from "../lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string | null;
  children?: React.ReactNode;
  small?: boolean;
  icon?: React.ReactNode;
  className?: string;
  variant?: "default" | "ghost";
  iconClassName?: string;
  classNameTitle?: string;
  classNameSubtitle?: string;
}

export function PageHeader({
  title,
  subtitle,
  children,
  small,
  icon,
  className,
  variant = "default",
  iconClassName,
  classNameTitle,
  classNameSubtitle,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "rounded-xl h-fit items-center flex md:flex-row justify-between gap-x-4 w-full gap-2",
        variant === "ghost"
          ? ""
          : "bg-white border border-slate-200 rounded-xl p-4",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {icon && <div className={iconClassName}>{icon}</div>}
        <div className="flex flex-col">
          <TypographyH2
            className={cn(
              "text-primary m-0 p-0 font-bold text-2xl",
              classNameTitle
            )}
          >
            {title}
          </TypographyH2>
          {subtitle && (
            <p className={cn("text-slate-400 text-sm", classNameSubtitle)}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-x-4 flex-shrink-0">{children}</div>
    </div>
  );
}
