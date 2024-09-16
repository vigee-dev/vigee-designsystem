"use client";
import { useDebouncedCallback } from "use-debounce";
import { PiSearchDefaultStroke } from "../../icons/PikaIcons";
import { cn } from "../lib/utils";

export default function Search({
  className,
  placeholder,
  onChange,
  defaultValue = "",
  debounceTime = 300
}: {
  className?: string,
  placeholder?: string,
  onChange: (value: string) => void,
  defaultValue?: string,
  debounceTime?: number
}) {
  const debouncedHandleSearch = useDebouncedCallback((term: string) => {
    onChange(term);
  }, debounceTime);

  return (
    <div className={cn("relative flex flex-1 max-w-lg flex-shrink-0 md:max-w-sm min-w-[200px]", className)}>
      <label htmlFor="search" className="sr-only">
        Rechercher
      </label>
      <input
        className="peer block w-full font-variations rounded-md border border-gray-200 py-[9px] pl-10 pr-2 text-[16px] md:text-sm outline-2 placeholder:text-gray-400"
        placeholder={placeholder ?? "Rechercher"}
        onChange={(e) => debouncedHandleSearch(e.target.value)}
        defaultValue={defaultValue}
        type="search"
      />
      <PiSearchDefaultStroke className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-900" />
    </div>
  );
}