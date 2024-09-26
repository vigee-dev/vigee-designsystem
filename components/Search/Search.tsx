"use client"

import { useDebouncedCallback } from "use-debounce";
import { PiSearchDefaultStroke } from "../../icons/PikaIcons";
import { cn } from "../lib/utils";
import { Label } from "../ui/label";
import * as React from "react";

export default function Search({
  className,
  label,
  description,
  placeholder,
  onChange,
  defaultValue = "",
  debounceTime = 300
}: {
  className?: string,
  label?: string,
  description?: string,
  placeholder?: string,
  onChange: (value: string) => void,
  defaultValue?: string,
  debounceTime?: number
}) {
  const debouncedHandleSearch = useDebouncedCallback((term: string) => {
    onChange(term);
  }, debounceTime);

  return (
    <div className={cn("relative flex flex-1 items-center max-w-lg flex-shrink-0 md:max-w-sm min-w-[200px] text-primary gap-2", className)}>
      {(label || description) && <div className="space-y-0.5">
        {label && <Label htmlFor={'search'} className={"text-base"}>{label}</Label>}
        {description && <p className={cn("text-sm text-muted-foreground")}>{description}</p>}
      </div>}
      <div className="relative flex flex-1">
        <input
          className="peer block w-full font-variations rounded-md border border-gray-200 py-[9px] pl-10 pr-2 text-[16px] md:text-sm outline-2 placeholder:text-gray-400"
          placeholder={placeholder ?? "Rechercher"}
          onChange={(e) => debouncedHandleSearch(e.target.value)}
          defaultValue={defaultValue}
          type="search"
        />
        <PiSearchDefaultStroke className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-900"/>
      </div>
    </div>
  );
}