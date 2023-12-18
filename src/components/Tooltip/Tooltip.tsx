import React from "react";

interface TooltipProps {
  message: string;
  children: React.ReactNode;
}

export function Tooltip({ message, children }: TooltipProps) {
  return (
    <div className="group relative flex z-50">
      {children}
      <span className="absolute top-10 scale-0 transition-all rounded bg-white p-2 text-xs text-primary group-hover:scale-100  shadow">
        {message}
      </span>
    </div>
  );
}
