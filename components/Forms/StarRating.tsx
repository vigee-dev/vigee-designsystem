/**
 * @description Notation sur 5 étoiles contrôlée par le parent (`value` / `onChange`), avec le libellé de la note sous les étoiles ; recliquer la note choisie la remet à zéro.
 * @useWhen recueillir une note de satisfaction ou d'évaluation (recette, avis client) → utiliser avec `value` + `onChange` | afficher une note déjà donnée, sans interaction → utiliser `readOnly` | bloquer la saisie pendant un enregistrement → utiliser `disabled`
 * @dontUseFor note sur une échelle continue ou sur plus de 5 → utiliser RatingSlider | choix oui / non → utiliser Switch | champ branché sur react-hook-form par `form` + `name` → ce composant ne l'est pas : garder la note dans un état et la reporter dans le formulaire
 * @example <StarRating value={rating} onChange={setRating} placeholder="Votre avis" testIdPrefix="review" tone="ink" />
 */
"use client";

import { useState } from "react";
import { cn } from "../lib/utils";
import { PiStarSolid, PiStarStroke } from "../../icons/PikaIcons";

const DEFAULT_LABELS = [
  "",
  "Décevant",
  "Mitigé",
  "Correct",
  "Très bien",
  "Excellent",
];

interface Props {
  /** Note actuelle (0 = aucune note). */
  value: number;
  /** Appelé au clic sur une étoile. Re-cliquer la même note la remet à 0. */
  onChange?: (value: number) => void;
  /** Lecture seule : affiche la note sans interaction. */
  readOnly?: boolean;
  /** Désactive temporairement l'interaction (ex: autosave en cours). */
  disabled?: boolean;
  /** Libellés affichés sous les étoiles (index 1..5). */
  labels?: string[];
  /** Texte affiché sous les étoiles tant qu'aucune n'est survolée/choisie.
   *  Remplacé par le label de la note au survol. */
  placeholder?: string;
  /** Taille des étoiles. */
  size?: "md" | "lg";
  /** Couleur des étoiles pleines : ambre (défaut) ou encre, la couleur principale Vigee. */
  tone?: "amber" | "ink";
  /** Préfixe des data-testid (ex: "review" → "review-star-3"). */
  testIdPrefix?: string;
  className?: string;
}

/**
 * Notation 5 étoiles contrôlée, réutilisable (recette, satisfaction client…).
 * Composant pur : l'état métier (note, persistance) reste au parent via value/onChange.
 */
export function StarRating({
  value,
  onChange,
  readOnly = false,
  disabled = false,
  labels = DEFAULT_LABELS,
  placeholder,
  size = "md",
  tone = "amber",
  testIdPrefix = "rating",
  className,
}: Props) {
  const [hover, setHover] = useState<number>(0);
  const locked = readOnly || disabled || !onChange;
  const display = hover || value;
  const starSize = size === "lg" ? "w-9 h-9" : "w-7 h-7";

  const handleSelect = (next: number) => {
    if (locked) return;
    // Re-cliquer sur la même étoile annule la note
    onChange(next === value ? 0 : next);
  };

  return (
    <div
      className={cn("flex flex-col items-center gap-2", className)}
      data-testid={`${testIdPrefix}-stars`}
    >
      <div
        className="flex items-center gap-1"
        onMouseLeave={() => setHover(0)}
        role={locked ? undefined : "radiogroup"}
        aria-label="Note de satisfaction"
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= display;
          const Icon = filled ? PiStarSolid : PiStarStroke;
          return (
            <button
              key={star}
              type="button"
              disabled={locked}
              onMouseEnter={() => !locked && setHover(star)}
              onClick={() => handleSelect(star)}
              className={cn(
                "p-0.5 rounded-md transition-transform",
                !locked && "hover:scale-110 cursor-pointer",
                locked && "cursor-default",
              )}
              title={locked ? undefined : labels[star]}
              aria-label={`${star} étoile${star > 1 ? "s" : ""}`}
              aria-checked={!locked ? star === value : undefined}
              role={locked ? undefined : "radio"}
              data-testid={`${testIdPrefix}-star-${star}`}
            >
              <Icon
                className={cn(
                  starSize,
                  "transition-colors",
                  filled ? (tone === "ink" ? "text-slate-900" : "text-amber-400") : "text-slate-300",
                )}
              />
            </button>
          );
        })}
      </div>

      {/* La ligne du libellé garde sa place, vide ou non : sinon tout bouge au survol. */}
      <span
        className={cn(
          "h-4 text-xs leading-4",
          display > 0 && labels[display]
            ? cn("font-medium", tone === "ink" ? "text-slate-600" : "text-amber-500")
            : "text-slate-400",
        )}
        aria-live="polite"
      >
        {display > 0 && labels[display] ? labels[display] : placeholder ?? ""}
      </span>
    </div>
  );
}
