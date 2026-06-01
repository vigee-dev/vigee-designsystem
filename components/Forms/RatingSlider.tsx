/**
 * @description Slider de notation 0–20 avec gradient fondu rouge → orange → vert et pommeau rond glissable. Idéal pour les notes de satisfaction client (CSAT, NPS-like).
 * @useWhen capter une note sur 20 avec retour visuel immédiat (couleur) → utiliser RatingSlider | saisir une note client à la fin d'un parcours → utiliser RatingSlider
 * @dontUseFor sélection libre dans une plage continue sans sémantique de note → utiliser un input range natif | choix discret parmi peu d'options → utiliser SegmentedToggle
 * @example <RatingSlider value={note} onChange={setNote} />
 */
"use client";

import * as React from "react";
import { cn } from "../lib/utils";

interface Props {
  value: number;
  onChange: (next: number) => void;
  /** Pas du slider. Défaut 0.5 (demi-points). */
  step?: number;
  disabled?: boolean;
  className?: string;
  "data-testid"?: string;
}

const MIN = 0;
const MAX = 20;

// Trois ancres de couleur (RGB) — rouge en bas, orange au milieu, vert en haut.
// On interpole entre rouge→orange sur [0, 10] et orange→vert sur [10, 20] pour
// un fondu fluide cohérent avec les seuils métier (vert ≥15 / orange 10–15 /
// rouge <10 sur la page de restitution).
const RED = { r: 239, g: 68, b: 68 };       // tailwind red-500
const ORANGE = { r: 245, g: 158, b: 11 };   // tailwind amber-500
const GREEN = { r: 16, g: 185, b: 129 };    // tailwind emerald-500

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

function colorForValue(v: number): string {
  const clamped = Math.max(MIN, Math.min(MAX, v));
  if (clamped <= 10) {
    const t = clamped / 10;
    return `rgb(${lerp(RED.r, ORANGE.r, t)}, ${lerp(RED.g, ORANGE.g, t)}, ${lerp(RED.b, ORANGE.b, t)})`;
  }
  const t = (clamped - 10) / 10;
  return `rgb(${lerp(ORANGE.r, GREEN.r, t)}, ${lerp(ORANGE.g, GREEN.g, t)}, ${lerp(ORANGE.b, GREEN.b, t)})`;
}

/**
 * Slider de notation sur 20 avec fondu rouge → orange → vert.
 *
 * Construction : un track personnalisé (gradient + masque qui révèle la
 * portion atteinte) recouvert par un `<input type="range">` natif transparent.
 * Le natif gère l'accessibilité (clavier, touch, ARIA) ; on n'a qu'à
 * positionner le pommeau visuel selon `value`.
 */
export function RatingSlider({
  value,
  onChange,
  step = 0.5,
  disabled,
  className,
  "data-testid": dataTestId,
}: Props) {
  const percent = ((value - MIN) / (MAX - MIN)) * 100;
  const color = colorForValue(value);

  return (
    <div
      className={cn("w-full select-none", className)}
      data-testid={dataTestId}
    >
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
          Note du client
        </span>
        <span
          className="text-3xl font-bold tabular-nums transition-colors"
          style={{ color }}
        >
          {value.toFixed(step >= 1 ? 0 : 1)}
          <span className="text-base text-slate-400 font-semibold ml-0.5">
            /20
          </span>
        </span>
      </div>

      <div className="relative h-10">
        {/* Track (fond gris) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-slate-100" />
        {/* Track rempli avec gradient fondu — largeur ∝ valeur */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded-full transition-[width] duration-150 ease-out"
          style={{
            width: `${percent}%`,
            background:
              "linear-gradient(90deg, rgb(239,68,68) 0%, rgb(245,158,11) 50%, rgb(16,185,129) 100%)",
            backgroundSize: `${(100 / Math.max(percent, 1)) * 100}% 100%`,
          }}
        />

        {/* Pommeau rond — couleur interpolée fluide selon la valeur */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full shadow-lg ring-4 ring-white pointer-events-none transition-[left,background-color] duration-150 ease-out"
          style={{
            left: `${percent}%`,
            backgroundColor: color,
          }}
          aria-hidden
        />

        {/* Input range natif transparent, par-dessus, gère l'interaction */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={step}
          value={value}
          disabled={disabled}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          aria-label="Note du client sur 20"
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={value}
        />
      </div>

      <div className="mt-1 flex justify-between text-[10px] font-medium text-slate-400 tabular-nums">
        <span>0</span>
        <span>10</span>
        <span>20</span>
      </div>
    </div>
  );
}
