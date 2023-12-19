import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import React from "react";

interface ButtonLoadingProps {
  children?: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;

  text?: string;
}

export function LoadingButton({
  variant = "default",
  children,
  text = "Enregistrement en cours",
}: ButtonLoadingProps) {
  return (
    <Button disabled variant={variant}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {children}
    </Button>
  );
}
