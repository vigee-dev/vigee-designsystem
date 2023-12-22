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
  className?: string;
}

export function LoadingButton({
  variant = "default",
  children,
  text = "Enregistrement en cours",
  className,
}: ButtonLoadingProps) {
  return (
    <Button disabled variant={variant} className={className}>
      <Loader2 className={`mr-2 h-4 w-4 animate-spin `} />
      {children}
    </Button>
  );
}
