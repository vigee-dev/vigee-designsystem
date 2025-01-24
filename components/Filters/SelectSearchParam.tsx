"use client"

import { useQueryState } from "nuqs"
import { Select } from "../Select/Select";
import { cn } from "../lib/utils";

interface Props {
  searchParam: string;
  placeholder?: string;
  status: { label: string; value: string; icon?: React.ReactNode }[];
  className?: string;
  shallow?: boolean;
  defaultValue?: string;
  clearOnDefault?: boolean;
}

const SelectSearchParam = ({ searchParam, status, placeholder, className, shallow = true, defaultValue, clearOnDefault = true }: Props) => {
  const [queryState, setQueryState] = useQueryState(searchParam,
    {
      ...(defaultValue ? { defaultValue } : {}),
      clearOnDefault,
      shallow,
    }
  )

  const handleChange = (value: string | undefined) => {
    setQueryState(value || null)
  }

  return (
    <Select
      className={cn("w-full md:w-auto", className)}
      onChange={handleChange}
      defaultValue={defaultValue}
      value={queryState || undefined}
      placeholder={placeholder}
      options={status}
      clearable
    />
  );
};

export default SelectSearchParam;
