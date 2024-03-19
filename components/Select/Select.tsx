import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { cn } from "../../lib/utils";

interface Option {
  value: string;
  label: string;
  group?: string;
}

interface SelectScrollableProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SelectScrollable({
  options,
  placeholder = "Sélectionnez une valeur",
  onChange,
  className,
}: SelectScrollableProps) {
  const groupedOptions = options.reduce<Record<string, Option[]>>(
    (acc, option) => {
      const group = option.group || "Ungrouped"; // Default group name for ungrouped items
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(option);
      return acc;
    },
    {}
  );

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className={cn("w-[280px]", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={cn(className)}>
        {Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
          <SelectGroup key={groupName}>
            {/* Only render the SelectLabel if the group name is not 'Ungrouped' */}
            {groupName !== "Ungrouped" && (
              <SelectLabel>{groupName}</SelectLabel>
            )}
            {groupOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
