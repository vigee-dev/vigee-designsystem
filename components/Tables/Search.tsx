"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import { PiSearchDefaultStroke } from "../../icons/PikaIcons";
import { cn } from "../lib/utils";

export default function TableSearch({ className, placeholder }: { className?: string, placeholder?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(term => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className={cn("relative flex flex-1 max-w-lg flex-shrink-0 md:max-w-sm min-w-[200px]", className)}>
      <label htmlFor="search" className="sr-only">
        Rechercher
      </label>
      <input
        className="peer block w-full font-variations rounded-md border border-gray-200 py-[9px] pl-10 text-[16px] md:text-sm outline-2 placeholder:text-gray-400"
        placeholder={placeholder ?? "Rechercher"}
        onChange={e => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <PiSearchDefaultStroke className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-900" />
    </div>
  );
}
