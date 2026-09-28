/**
 * @description Texte éditable en place, sans cadre : se lit comme un libellé, se modifie en tapant dedans. Entrée ou perte de focus enregistre, Échap annule.
 * @useWhen renommer un élément directement dans une liste ou une carte (titre de tâche, nom d'item) sans ouvrir de formulaire → utiliser InlineText
 * @dontUseFor champ de formulaire avec label et validation → utiliser Forms/Input | texte multi-lignes → utiliser Forms/TextArea
 * @example <InlineText value={task.title} onCommit={(title) => rename(title)} data-testid="today-task-title-input" />
 * @example <InlineText fitContent value={task.title} onCommit={rename} /> — le champ prend la largeur de son texte, pour coller un repère juste après le nom
 */
"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { Input as ShadInput } from "../ui/input";

/**
 * Ce qu'il faut enregistrer à la validation : le texte nettoyé, ou null
 * quand il n'y a rien à faire (inchangé ou vide, qui revient à l'ancien).
 */
export function resolveInlineCommit(previous: string, draft: string): string | null {
  const next = draft.replace(/\s+/g, " ").trim();
  if (next.length === 0) return null;
  if (next === previous.trim()) return null;
  return next;
}

type Props = {
  value: string;
  onCommit: (next: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  /** Le champ prend la largeur de son texte au lieu de toute la place. */
  fitContent?: boolean;
  className?: string;
  "aria-label"?: string;
  "data-testid"?: string;
};

export function InlineText({
  value,
  onCommit,
  placeholder,
  disabled,
  maxLength = 255,
  fitContent = false,
  className,
  "aria-label": ariaLabel,
  "data-testid": dataTestId,
}: Props) {
  const [draft, setDraft] = React.useState(value);
  const [seenValue, setSeenValue] = React.useState(value);
  const cancelled = React.useRef(false);

  // La valeur change de l'extérieur (enregistrée, annulée) : le brouillon suit.
  if (seenValue !== value) {
    setSeenValue(value);
    setDraft(value);
  }

  const commit = () => {
    if (cancelled.current) {
      cancelled.current = false;
      setDraft(value);
      return;
    }
    const next = resolveInlineCommit(value, draft);
    if (next === null) {
      setDraft(value);
      return;
    }
    setDraft(next);
    onCommit(next);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
    if (e.key === "Escape") {
      cancelled.current = true;
      e.currentTarget.blur();
    }
  };

  const field = (
    <ShadInput
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      aria-label={ariaLabel}
      data-testid={dataTestId}
      title={draft}
      spellCheck={false}
      autoComplete="off"
      // Sans ça, la largeur par défaut d'un champ (~20 caractères) élargit la
      // cellule quand le texte est plus court.
      size={fitContent ? 1 : undefined}
      className={cn(
        "h-auto min-w-0 truncate rounded-md border-0 bg-transparent px-0 py-0 text-inherit shadow-none [font-family:inherit]",
        "focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-transparent",
        "disabled:cursor-default disabled:opacity-100",
        fitContent && "col-start-1 row-start-1 w-full",
        className,
      )}
    />
  );

  if (!fitContent) return field;

  // Un double invisible du texte donne sa largeur à la cellule ; le champ
  // s'y superpose. Le nom reste tronqué quand la place manque.
  return (
    <span className="inline-grid min-w-0 max-w-full grid-cols-[minmax(0,auto)]">
      <span
        aria-hidden
        className={cn(
          "invisible col-start-1 row-start-1 truncate whitespace-pre pr-0.5",
          className,
        )}
      >
        {draft || placeholder || " "}
      </span>
      {field}
    </span>
  );
}

export default InlineText;
