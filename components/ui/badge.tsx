/**
 * @description Étiquette visuelle inline pour signaler un statut, une catégorie ou un compteur sur un élément UI.
 * @useWhen afficher le statut d'une entité (actif, archivé, en attente) → utiliser Badge | indiquer un type ou une catégorie sur une carte ou une ligne de tableau → utiliser Badge | signaler un compteur ou une nouveauté sur un élément → utiliser Badge
 * @dontUseFor actions utilisateur → utiliser Button | notifications système avec message détaillé → utiliser AlertInfo
 * @example <Badge variant="destructive">Annulé</Badge>
 */
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
