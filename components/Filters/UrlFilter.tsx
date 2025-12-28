"use client";

import { useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { cn } from "../lib/utils";

interface Props {
  name: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  type?: string;
  defaultValue?: string;
  className?: string;
}

export const UrlFilter = ({
  name,
  options,
  placeholder,
  type = "string",
  defaultValue,
  className,
}: Props) => {
  const [filter, setFilter] = useQueryState(name, {
    defaultValue: defaultValue || "",
    clearOnDefault: true,
    shallow: false,
  });

  const handleValueChange = (newValue: string) => {
    if (newValue == filter) {
      setFilter("");
      return;
    }

    setFilter(newValue);
  };

  return (
    <Select onValueChange={handleValueChange} defaultValue={filter}>
      <SelectTrigger className={cn("w-fit", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-full md:w-auto">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
