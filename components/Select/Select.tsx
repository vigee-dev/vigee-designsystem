"use client";
import * as React from "react";
import {
  Select as SelectShadCn,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "../lib/utils";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { Button } from "../Buttons/Button";

export interface SelectOption {
  value: string;
  label: string;
  group?: string;
  icon?: React.ReactNode;
}

export interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  onChange: (value: string | undefined) => void;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
  label?: string;
  value?: string;
  clearable?: boolean;
  classNameContent?: string;
}

export function Select({
  options,
  placeholder = "Sélectionnez une valeur",
  onChange,
  className,
  disabled,
  defaultValue,
  label,
  value,
  clearable = false,
  classNameContent,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(
    defaultValue || undefined
  );
  const [key, setKey] = useState<string>(
    new Date().toISOString()
  ); /* key to control the rerender of the component */

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const groupedOptions = options.reduce<Record<string, SelectOption[]>>(
    (acc, option) => {
      const group = option.group || "Ungrouped"; // Default group name for ungrouped items
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group]?.push(option);
      return acc;
    },
    {}
  );

  const handleValueChange = (newValue: string) => {
    // TODO: What's the reason of this check ? When selecting the same value, the handleValueChange isn't called
    if (newValue === String(selectedValue)) {
      setSelectedValue(undefined);
      onChange(undefined);
    } else {
      setSelectedValue(newValue);
      onChange(newValue);
    }
  };

  const handleClear = () => {
    setKey(new Date().toISOString()); // /!\ Force the component to re-render by setting a new key
    setSelectedValue(undefined);
    onChange(undefined);
  };

  return (
    <SelectShadCn
      key={key}
      onValueChange={handleValueChange}
      defaultValue={selectedValue}
      value={selectedValue}
      disabled={disabled}
    >
      {label && <Label className="font-black text-primary mt-2">{label}</Label>}

      <SelectTrigger
        className={cn("w-[280px] font-medium bg-input ", className)}
      >
        <div className="flex items-center">
          <SelectValue placeholder={placeholder} />
          {clearable && selectedValue && (
            <Button
              onPointerDown={handleClear}
              className={`ml-2 p-0 h-4 w-4`}
              icon={"cross"}
            />
          )}
        </div>
      </SelectTrigger>

      <SelectContent
        className={cn("max-h-[200px] font-medium", classNameContent)}
      >
        {Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
          <SelectGroup key={groupName}>
            {/* Only render the SelectLabel if the group name is not 'Ungrouped' */}
            {groupName !== "Ungrouped" && (
              <SelectLabel>{groupName}</SelectLabel>
            )}
            {groupOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  {option.icon} {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </SelectShadCn>
  );
}
