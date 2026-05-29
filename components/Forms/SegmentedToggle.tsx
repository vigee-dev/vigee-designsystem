/**
 * @description Groupe de boutons toggle à sélection unique, CONTRÔLÉ (value/onChange) — variante non-react-hook-form de Toggles, pour les actions immédiates. Supporte icône, description et rendu carte.
 * @useWhen choix exclusif déclenchant une action immédiate hors formulaire (ex: statut Actif/Inactif, mode de déclenchement) → utiliser SegmentedToggle | besoin du même rendu visuel que Toggles sans react-hook-form → utiliser SegmentedToggle
 * @dontUseFor choix intégré à un react-hook-form → utiliser Toggles | filtrage hors formulaire synchronisé URL → utiliser CheckboxFilter
 * @example <SegmentedToggle value={mode} onChange={setMode} options={[{ value: "a", label: "A", icon: <IconA /> }, { value: "b", label: "B" }]} />
 */
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "../Container/Container";
import { cn } from "../lib/utils";
import {
  ToggleGroup as ShadToggleGroup,
  ToggleGroupItem,
} from "../ui/toggle-group";

export type SegmentedOption = {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  "data-testid"?: string;
};

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: SegmentedOption[];
  className?: string;
  optionsClassName?: string;
  disabled?: boolean;
  /** Disposition horizontale (sinon empilé en colonne). Défaut: true. */
  nowrap?: boolean;
  "data-testid"?: string;
}

/**
 * Variante CONTRÔLÉE de Toggles (pas de react-hook-form) : pilotée par
 * value/onChange, pour les choix exclusifs qui déclenchent une action
 * immédiate (statut, mode de déclenchement, etc.). Même rendu visuel que
 * Toggles : carte, icône optionnelle, description, état actif `bg-input`.
 *
 * La désélection est empêchée (un mode reste toujours sélectionné).
 */
export function SegmentedToggle({
  value,
  onChange,
  options,
  className,
  optionsClassName,
  disabled,
  nowrap = true,
  "data-testid": dataTestId,
}: Props) {
  return (
    <Container className={cn("p-1", className)} data-testid={dataTestId}>
      <ShadToggleGroup
        type="single"
        className={cn(
          "w-full gap-2 items-stretch",
          nowrap ? "flex md:flex-row flex-col" : "flex flex-col"
        )}
        value={value}
        onValueChange={(next: string) => {
          // Pas de désélection : on garde toujours une option active.
          if (!next) return;
          onChange(next);
        }}
        disabled={disabled}
      >
        {options.map((option) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0.8, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={cn("h-full w-full", nowrap && "flex-1")}
          >
            <ToggleGroupItem
              value={option.value}
              aria-label={
                typeof option.label === "string" ? option.label : option.value
              }
              disabled={option.disabled}
              data-testid={option["data-testid"]}
              className={cn(
                "items-center h-full w-full flex-1 p-4 flex justify-start gap-4 md:px-6 rounded-lg border-none data-[state=on]:bg-input hover:bg-input",
                optionsClassName
              )}
            >
              {option.icon && <div className="shrink-0">{option.icon}</div>}
              {(option.label || option.description) && (
                <div className="w-full text-left">
                  {option.label && (
                    <span className="text-md font-bold block">
                      {option.label}
                    </span>
                  )}
                  {option.description && (
                    <p className="text-xs text-gray-500 leading-relaxed mt-1 tracking-wide">
                      {option.description}
                    </p>
                  )}
                </div>
              )}
            </ToggleGroupItem>
          </motion.div>
        ))}
      </ShadToggleGroup>
    </Container>
  );
}
