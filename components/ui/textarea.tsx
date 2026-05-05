/**
 * @description Textarea stylisée Vigee, compatible ref-forwarding, pour saisie de texte multi-lignes dans les formulaires.
 * @useWhen saisie de texte long (description, commentaire, note) dans un formulaire | champ contrôlé ou non-contrôlé natif HTML | intégration avec react-hook-form via `{...field}` spread
 * @dontUseFor saisie courte (nom, email, mot de passe) → utiliser Input | texte riche avec formatage → utiliser TextArea (Forms)
 * @example <Textarea placeholder="Décrivez votre projet..." rows={4} />
 */
import * as React from "react";

import { cn } from "../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
