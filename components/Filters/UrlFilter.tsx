"use client";

import { useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import React from "react";

interface Props {
  name: string;
  placeholder?: string;
  options: { label: string; value: string }[];
}

export const UrlFilter = ({ name, options, placeholder }: Props) => {
  const [filter, setFilter] = useQueryState(name, { defaultValue: "" });

  const handleValueChange = (newValue: string) => {
    setFilter(newValue);
  };

  return (
    <Select onValueChange={handleValueChange} defaultValue={filter}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
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
