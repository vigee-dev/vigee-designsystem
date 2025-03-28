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
