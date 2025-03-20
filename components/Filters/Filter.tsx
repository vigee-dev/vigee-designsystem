"use client";

import { Select } from "../../components/Select/Select";
import { useQueryState } from "nuqs";

export const Filter = ({ queryKey, options, placeholder, defaultValue }: { queryKey: string; options: { label: string; value: string }[]; placeholder?: string; defaultValue?: string }) => {
  const [value, setValue] = useQueryState(queryKey, { shallow: false });

  const handleChange = (value: string | undefined) => {
    setValue(value || null);
  };

  return <Select onChange={handleChange} options={options} placeholder={placeholder} className="w-fit bg-transparent border-none whitespace-nowrap" defaultValue={value ?? defaultValue} clearable />;
};
