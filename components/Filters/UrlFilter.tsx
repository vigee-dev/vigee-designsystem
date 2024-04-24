"use client";

import { useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import React from "react";

interface Props {
  name: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  type?: string;
  defaultValue?: string
}

export const UrlFilter = ({
  name,
  options,
  placeholder,
  type = "string",
  defaultValue
}: Props) => {
  const [filter, setFilter] = useQueryState(name, {
    defaultValue: defaultValue || '',
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
      <SelectTrigger className="w-fit">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-full md:w-auto">
        <SelectGroup>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
