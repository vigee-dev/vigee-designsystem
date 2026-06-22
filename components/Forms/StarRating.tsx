"use client";

import { useState } from "react";
import { cn } from "@/vigee-designsystem/components/lib/utils";
import { PiStarSolid, PiStarStroke } from "@/vigee-designsystem/icons/PikaIcons";

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
                  filled ? "text-amber-400" : "text-slate-300",
                )}
              />
            </button>
          );
        })}
      </div>

      {display > 0 && labels[display] ? (
        <span className="text-xs font-medium text-amber-500">
          {labels[display]}
        </span>
      ) : (
        placeholder && (
          <span className="text-xs text-slate-400">{placeholder}</span>
        )
      )}
    </div>
  );
}
