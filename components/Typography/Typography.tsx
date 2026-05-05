/**
 * @description Composants typographiques Vigee (H1→H4, Body, BodySmall, Caption, Blockquote) appliquant les styles de la charte via Tailwind.
 * @useWhen titre principal de page → utiliser TypographyH1 | titre de section → utiliser TypographyH2 | sous-titre avec couleur primaire → utiliser TypographyH3 | texte courant de contenu → utiliser Body | métadonnées, labels secondaires → utiliser Caption
 * @dontUseFor titres animés → utiliser TitleGradual | titre de page avec actions et breadcrumb → utiliser PageHeader
 * @example <TypographyH1>Tableau de bord</TypographyH1>
 */
import { cn } from "../lib/utils";

export function TypographyH1({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h1 className={cn(`flex items-center scroll-m-20 text-2xl font-bold  lg:text-2xl my-1`, className)}>{children}</h1>;
}

export function TypographyH2({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn(`scroll-m-20  pb-2 text-xl  tracking-tight first:mt-0 font-bold`, className)}>{children}</h2>;
}

export function TypographyH3({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`scroll-m-20 text-lg text-primary tracking-tight ${className}`}>{children}</h3>;
}

export function TypographyH4({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h4 className={`scroll-m-20 text-md tracking-tight ${className}`}>{children}</h4>;
}

export function TypographyBlockquote({ children }: { children: React.ReactNode }) {
  return <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>;
}

// Style commun à tous les bodies — police héritée du body (Geist),
// tracking légèrement aéré + line-height confortable pour la lecture longue
// dans un studio web. À appliquer sur tout texte qui n'est pas titre / label / code.
const BODY_BASE = "font-normal text-foreground/85 leading-relaxed tracking-[-0.005em]";

export function Body({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn(BODY_BASE, "text-[15px]", className)}>{children}</p>;
}

export function BodySmall({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn(BODY_BASE, "text-[13px]", className)}>{children}</p>;
}

export function Caption({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn(BODY_BASE, "text-xs text-foreground/65", className)}>{children}</p>;
}
