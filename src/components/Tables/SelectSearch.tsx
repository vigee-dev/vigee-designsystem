"use client";
import React, { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../ui/select";

interface Item {
  value: string;
}

interface FilterableSelectProps {
  items: Item[];
  placeholder: string;
  query: string;
  preselected?: string;
}

const FilterableSelect: React.FC<FilterableSelectProps> = ({
  items,
  placeholder,
  query,
  preselected,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedValue, setSelectedValue] = useState<string | null>(
    preselected || null
  );

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(query, preselected || value);
    if (value) {
      params.set(query, value);
      setSelectedValue(value);
    } else {
      params.delete(query);
      setSelectedValue(null);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      value={selectedValue || preselected}
      onValueChange={(value: string) => handleSelect(value)}
    >
      <SelectTrigger>{selectedValue || placeholder}</SelectTrigger>
      <SelectContent>
        {items.map((item, index) => (
          <SelectItem key={index} value={item.value}>
            {item.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterableSelect;
