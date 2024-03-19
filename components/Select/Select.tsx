import * as React from "react";
import {
  Select as SelectShadCn,
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
  onChange: (value: string | undefined) => void;
  className?: string;
  disabled?: boolean;
}

export function Select({
  options,
  placeholder = "Sélectionnez une valeur",
  onChange,
  className,
  disabled,
}: SelectScrollableProps) {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(
    undefined
  );

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

  const handleValueChange = (newValue: string) => {
    if (newValue === String(selectedValue)) {
      setSelectedValue(undefined);
      onChange(undefined);
    } else {
      setSelectedValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <SelectShadCn
      onValueChange={handleValueChange}
      defaultValue={selectedValue || undefined}
      disabled={disabled}
    >
      <SelectTrigger
        className={cn("w-[280px] font-medium bg-input border-none", className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={cn("max-h-[200px] font-medium", className)}>
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
    </SelectShadCn>
  );
}
