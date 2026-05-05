/**
 * @description Bouton de soumission de formulaire avec état de chargement automatique via `useFormStatus` de React DOM.
 * @useWhen formulaire React DOM (Server Actions) nécessitant un submit → utiliser ButtonSubmit | état `pending` à gérer automatiquement sans prop manuelle → utiliser ButtonSubmit
 * @dontUseFor formulaires react-hook-form → utiliser Button avec `type="submit"` | actions destructives → utiliser ActionWithValidation | suppression → utiliser DeleteAction
 * @example <ButtonSubmit />
 */
"use client";

// @ts-ignore
import { useFormStatus } from "react-dom";
import { Button } from "./Button";

export const ButtonSubmit = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" pending={pending} icon="chevron">
      Enregistrer
    </Button>
  );
};
