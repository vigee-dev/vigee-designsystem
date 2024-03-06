import React from "react";
import {
  TooltipProvider,
  Tooltip as TootltipShad,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";

interface TooltipProps {
  message: string;
  children: React.ReactNode;
}

export function Tooltip({ message, children }: TooltipProps) {
  return (
    <div className="relative">
      <TooltipProvider>
        <TootltipShad>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent>{message}</TooltipContent>
        </TootltipShad>
      </TooltipProvider>
    </div>
  );
}
