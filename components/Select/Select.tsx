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
}

export function Select({
  options,
  placeholder = "Sélectionnez une valeur",
  onChange,
  className,
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
    // Check if the new value is the same as the current selected value
    if (newValue === selectedValue) {
      // If it is, reset the selection
      setSelectedValue(undefined);
      onChange(undefined); // Reset to initial state or pass a specific "reset" value if needed
    } else {
      // If not, update the selected value and propagate the change
      setSelectedValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <SelectShadCn onValueChange={handleValueChange}>
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
