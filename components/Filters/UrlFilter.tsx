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
}

export const UrlFilter = ({
  name,
  options,
  placeholder = name.toLocaleUpperCase(),
  type = "string",
}: Props) => {
  const [filter, setFilter] = useQueryState(name, {
    defaultValue: "",
    clearOnDefault: true,
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
      <SelectTrigger className="w-[180px]">
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
