"use client";
import { useMemo, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { cn } from "../lib/utils";
import { PiCheckTickSingleStroke } from "../../icons/PikaIcons";

export type SelectMultipleOption = {
  label: string;
  value: number | string;
  icon: React.ReactNode;
};

interface SelectMultipleProps {
  options: SelectMultipleOption[];
  placeholder?: string;
  icon?: React.ReactNode;
  queryKey?: string;
}

export default function SelectMultiple({
  options,
  placeholder,
  icon,
  queryKey = "equipments",
}: SelectMultipleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramName = `${queryKey}[]`;

  const allowedValues = options.map((opt) => String(opt.value));

  const selectedValues = useMemo(() => {
    if (!searchParams) return [];
    const values = searchParams.getAll(paramName);
    return values.map(String);
  }, [searchParams, paramName]);

  useEffect(() => {
    if (!searchParams) return;
    const filtered = selectedValues.filter((v) => allowedValues.includes(v));
    if (filtered.length !== selectedValues.length) {
      const params = new URLSearchParams(searchParams.toString());
      // Reset and keep only allowed values
      params.delete(paramName);
      filtered.forEach((v) => params.append(paramName, v));
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`);
    }
  }, [
    searchParams,
    allowedValues.join(","),
    router,
    pathname,
    paramName,
    selectedValues,
  ]);

  const toggleValue = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    const current = params.getAll(paramName).map(String);
    const isSelected = current.includes(value);
    const next = isSelected
      ? current.filter((v) => v !== value)
      : [...current, value];

    // Clear all then append one per value to get equipments[]=1&equipments[]=2
    params.delete(paramName);
    next.forEach((v) => params.append(paramName, v));

    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`);
  };

  const selectedOptions = options.filter((opt) =>
    selectedValues.includes(String(opt.value))
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl border px-3 py-1 cursor-pointer",
            selectedOptions.length === 0 && "text-gray-500"
          )}
        >
          {selectedOptions.length === 0 ? (
            <>
              {icon && <span className="mr-1 flex items-center">{icon}</span>}
              <span className="text-sm">{placeholder}</span>
            </>
          ) : (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar ">
              {selectedOptions.map((opt) => (
                <Badge
                  key={opt.value}
                  className="bg-slate-200 text-black transition hover:bg-gray-300 cursor-pointer flex items-center gap-1 rounded-full px-3 py-1 shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleValue(String(opt.value));
                  }}
                >
                  {opt.icon}
                  <span className="truncate">{opt.label}</span>
                  <span className="ml-1 cursor-pointer">&times;</span>
                </Badge>
              ))}
            </div>
          )}
          <span className="ml-auto text-lg">&#9662;</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start">
        <div className="flex flex-col max-h-60 overflow-y-auto">
          {options.map((opt) => {
            const isSelected = selectedValues.includes(String(opt.value));
            return (
              <div
                key={opt.value}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100",
                  isSelected && "bg-gray-100"
                )}
                onClick={() => toggleValue(String(opt.value))}
              >
                <span>{opt.icon}</span>
                <span className="flex-1 truncate">{opt.label}</span>
                {isSelected && (
                  <span className="text-lg">
                    <PiCheckTickSingleStroke />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
