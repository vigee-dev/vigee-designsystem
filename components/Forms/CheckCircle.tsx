/**
 * @description Rond à cocher : cercle fin vide, plein et coché une fois fait. Pour marquer une chose comme faite d'un seul clic, sans menu.
 * @useWhen cocher / décocher une tâche ou un item de liste en action immédiate → utiliser CheckCircle
 * @dontUseFor case dans un formulaire react-hook-form → utiliser Checkbox | choix entre plusieurs statuts → utiliser un Popover de statuts
 * @example <CheckCircle checked={done} onCheckedChange={toggle} aria-label="Marquer comme faite" data-testid="today-task-check-btn" />
 */
"use client";

import * as React from "react";
import { PiCheckTickSingleStroke } from "../../icons/PikaIcons";
import { cn } from "../lib/utils";

type Props = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  size?: "md" | "lg";
  disabled?: boolean;
  "aria-label"?: string;
  "data-testid"?: string;
};

const sizes = {
  md: { box: "h-5 w-5", icon: "h-3 w-3" },
  lg: { box: "h-7 w-7", icon: "h-4 w-4" },
};

export function CheckCircle({
  checked,
  onCheckedChange,
  size = "md",
  disabled,
  "aria-label": ariaLabel,
  "data-testid": dataTestId,
}: Props) {
  const s = sizes[size];
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      data-testid={dataTestId}
      onClick={(e) => {
        e.stopPropagation();
        onCheckedChange(!checked);
      }}
      className={cn(
        "group/check flex shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2",
        "disabled:cursor-default disabled:opacity-60",
        s.box,
        checked
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-300 bg-transparent text-transparent hover:border-slate-500 hover:text-slate-400",
      )}
    >
      <PiCheckTickSingleStroke className={cn(s.icon, "transition-colors")} />
    </button>
  );
}

export default CheckCircle;
